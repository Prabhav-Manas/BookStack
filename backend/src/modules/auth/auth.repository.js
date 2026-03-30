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