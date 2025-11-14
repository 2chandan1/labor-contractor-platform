import { Request, response, Response } from "express";
import { User, EmployeeProfile, EmployerProfile } from "../models";
import { UserStatus } from "../types";
import jwt from "jsonwebtoken";
import { Otp } from "../models/Otp.model";
const authkey = process.env.MSG91_AUTH_KEY!;
export const checkUser= async (req:Request, res:Response)=>{
   try {
      const {mobileNumber} =req.body;
      if(!mobileNumber) return res.status(400).json({message:"Mobile number is required"});
      let isExistingUser=false
      const user = await User.findOne({ mobileNumber: mobileNumber });
      if(user){
          isExistingUser= true
      }
      return res.status(200).json({
          success: true,
          exists: isExistingUser
        });
   } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error
      });
   }
}

export const sendOtp= async (req:Request,res:Response)=>{
    try {
        const {mobileNumber}= req.body;
        if(!mobileNumber) return res.status(400).json({message:"Mobile number is required"})
        const formattedMobilenumber=mobileNumber.startsWith("91")?mobileNumber:`91${mobileNumber}`;
        const templateId = process.env.MSG91_TEMPLATE_ID!;
        const otp_expiry=15;
        const http = require('https');
        const options = {
          method: 'POST',
          hostname: 'control.msg91.com',
          port: null,
          path: `/api/v5/otp`,
          headers: {
            'authkey':`${authkey}`,
            'content-type': 'application/json',
            'Content-Type': 'application/JSON'
          }
        };

        const sms_req = http.request(options, function (sms_res:any) {
          let data="";
          sms_res.on('data', (chunk:any)=> {
            data += chunk;
          });

          sms_res.on('end', async () => {
            console.log("Full MSG91 Response:", data); 
            const responseJson=JSON.parse(data);
            console.log("Parsed Response:", responseJson);
            if (responseJson.type === "success") {
              await Otp.findOneAndUpdate(
                {mobileNumber},
                {request_id:responseJson.request_id},
                 {upsert:true}
              );
              return res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                request_id: responseJson.request_id,
              });
            } else {
              return res.status(500).json({
                success: false,
                message: "Failed to send OTP",
                response: responseJson,
              });
            }
          });
        });
        sms_req.on("error", (error:any) => {
          return res.status(500).json({
            success: false,
            message: "MSG91 request error",
            error,
          });
        });
        sms_req.write(JSON.stringify({
          "template_id": templateId,
          "mobile": formattedMobilenumber,
          "otp_expiry": otp_expiry
        }));
        sms_req.end();
        
     } catch (error) {
        res.status(500).json({
          message:"Something went wrong",
          error
        })
     }
}

// export const resendOtp= async (req:Request,res:Response)=>{
//     const http = require('https');

//     const options = {
//       method: 'GET',
//       hostname: 'control.msg91.com',
//       port: null,
//       path: '/api/v5/otp/retry?authkey=&retrytype=&mobile=',
//       headers: {
//         'authkey':`${authkey}`,
//       }
//     };

//     const req = http.request(options, function (res) {
//       const chunks = [];

//       res.on('data', function (chunk) {
//         chunks.push(chunk);
//       });

//       res.on('end', function () {
//         const body = Buffer.concat(chunks);
//         console.log(body.toString());
//       });
//     });

//     req.end();
// }

export const otpVerify= async (req:Request, res:Response)=>{

  try {
    const {mobileNumber, otp} =req.body;
    if(!mobileNumber || !otp) {
      return res.status(400).json({
        message:"Mobile number and otp is required"
      })
    }
    const formattedMobilenumber = mobileNumber.startsWith("91") 
      ? mobileNumber 
      : `91${mobileNumber}`;

    const http = require('https');
    const options = {
      method: 'GET',
      hostname: 'control.msg91.com',
      port: null,
      path: `/api/v5/otp/verify?otp=${otp}&mobile=${formattedMobilenumber}`,
      headers: {
        authkey:process.env.MSG91_AUTH_KEY
      }
    };

    const sms_req = http.request(options, (sms_res:any)=> {
      let data=""
      sms_res.on('data', (chunk:any)=> {
        data += chunk
      });

      sms_res.on('end', async()=> {
        const responseJson=JSON.parse(data);
        const response= 'success'
        if(response==='success'){
          const user = await User.findOne({ mobileNumber: mobileNumber });
          if(user){
            const token=jwt.sign(
              {id:user._id, mobileNumber:user.mobileNumber, role:user.role },
              process.env.JWT_SECRET!,
              {expiresIn:"5d"}
            )
            return res.status(200).json({
              success:true,
              isExistingUser: true,
              token,
              user,
              message:"OTP Verified successfuly"
            })
          }else {
            return res.json({
              success: true,
              isExistingUser: false,
            });
          }
        }else{
          return res.status(400).json({
            success:false,
            message:responseJson.message ||"OTP Verification failed"
          })
        }
        
      });
    });
    sms_req.on("error", (error: any) => {
      return res.status(500).json({
        success: false,
        message: "Verification request error",
        error
      });
    });
    sms_req.end();
  } catch (error) {
    
  }
    
}

export const register = async (req: Request, res: Response) => {
  try {
    const {
      mobileNumber,
      role,
      fullName,
      age,
      gender,
      experience,
      address,
      city,
      state,
      pincode,
      termsAndCondition
    } = req.body;

    const aadhaarCard = req.file?.path;
    if (!aadhaarCard) {
      return res.status(400).json({ message: "Aadhaar card image is required" });
    }

    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
   
    const user = new User({
      mobileNumber,
      role,
      status: UserStatus.ACTIVE,
      isVerified: true,
    });
     
    let profile;

    // Create profile instance based on role (but do NOT save yet)
    if (role === "labour") {
      profile = new EmployeeProfile({
        userId: user._id,
        fullName,
        age: Number(age),
        gender,
        aadhaarCard,
        experience: Number(experience),
        address,
        city,
        state,
        pincode,
        termsAndCondition,
        rating: { average: 0, count: 0 },
        totalWorkDays: 0,
        isAvailable: true,
      });
    } else if (role === "contractor") {
      profile = new EmployerProfile({
        userId: user._id,
        fullName,
        age,
        gender,
        address,
        city,
        aadhaarCard,
        termsAndCondition,
        rating: { average: 0, count: 0 },
        totalBookings: 0,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
    await user.save();
    await profile.save();
    const token=jwt.sign(
              {id:user._id, mobileNumber:user.mobileNumber, role:user.role },
              process.env.JWT_SECRET!,
              {expiresIn:"5d"}
            )
    res.status(201).json({
      success: true,
      message: "User registered",
      user,
      token
    });
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Internal server error", error });
  }
};

