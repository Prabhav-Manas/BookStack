const User=require('../user/user.model');

exports.findUserByEmail=async(email)=>{
    return await User.findOne({email})
}

exports.createUser=async(userData)=>{
    return await User.create(userData);
}