// src/routes/user.routes.ts
import { Router, Request, Response } from 'express';
import { EmployeeProfile, User,EmployerProfile } from '../models';
const router = Router();

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
