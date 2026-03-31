const User=require('../user/user.model');
const jwt=require('jsonwebtoken');

exports.findUserByEmail=async(email)=>{
    return await User.findOne({email})
}

exports.createUser=async(userData)=>{
    return await User.create(userData);
}

exports.verifyUser=async(email)=>{
    return User.findOneAndUpdate({email}, {isVerified:true, verificationToken:null}, {returnDocument:'after'});
}

exports.saveResetToken=(email, token=null, expiry=null, otp=null, otpExpiry=null)=>{
    const update = {};
    if (token !== undefined) update.resetToken = token;
    if (expiry !== undefined) update.resetTokenExpiration = expiry;
    if (otp !== undefined) update.resetOTP = otp;
    if (otpExpiry !== undefined) update.resetOTPExpiry = otpExpiry;

    return User.findOneAndUpdate({email}, update, { returnDocument: 'after' });
}

exports.findUserByResetToken=async(token)=>{
    return await User.findOne({
        resetToken:token,
        resetTokenExpiration:{$gt:Date.now()}
    });
}

exports.updatePassword=async(userId, hashedPassword, passwordHistory)=>{
    return await User.findByIdAndUpdate(
        userId,
        {password:hashedPassword, passwordHistory: passwordHistory, resetToken:null, resetTokenExpiration:null, resetOTP: null, resetOTPExpiry: null},
        {new:true}
    )
}