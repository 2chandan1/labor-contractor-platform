import mongoose from "mongoose";

const OtpSchema=new mongoose.Schema(
    {
        mobileNumber:{type:String, required:true},
        request_id: { type: String, required: true },
    },
    {
        timestamps: true
    }
)
export const Otp=mongoose.model("Otp",OtpSchema)