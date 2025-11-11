// src/routes/user.routes.ts
import { Router, Request, Response } from 'express';
import { otpStore } from '../utils/otpStore';
import { EmployeeProfile, User,EmployerProfile } from '../models';
import { UserStatus } from '../types';


const router = Router();
// Send OTP
router.post('/send-otp', async (req: Request, res: Response) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) return res.status(400).json({ message: 'Mobile number is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[mobileNumber] = otp;

  // TODO: Send OTP via MSG91/Twilio
  console.log('OTP for', mobileNumber, otp);

  res.json({ success: true, message: 'OTP sent' });
});

// Verify OTP
router.post('/verify-otp', async (req: Request, res: Response) => {
  const { mobileNumber, otp } = req.body;

  if (!otpStore[mobileNumber] || otpStore[mobileNumber] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  // OTP correct, mark user verified if exists
  let user = await User.findOne({ mobileNumber }); 
  if (user) {
    user.isVerified = true;
    user.status = UserStatus.ACTIVE;
    await user.save();
  }

  delete otpStore[mobileNumber];
  res.json({ success: true, message: 'OTP verified', user });
});

router.get('/:mobileNumber', async (req :Request, res:Response)=>{
  const { mobileNumber } = req.params;
  if (!mobileNumber) return res.status(400).json({ message: 'Mobile number is required' });
  const user=await User.findOne({mobileNumber});
  if(!user) return res.status(404).json({message:'User not found'});
  const profile= user.role==='labour' ? await EmployeeProfile.findOne({userId:user._id}) : await EmployerProfile.findOne({userId:user._id});
  res.json({success:true,
    message:'Profile fetched successfully',
    profile,
    user
  });
})

export default router;
