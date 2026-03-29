const User=require('../user/user.model');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository')

exports.createUserService=async(data)=>{
    const {fullname, email, password, role}=data;

    if(!fullname || !email || !password || !role){
        throw new Error('All fields are required!');
    }

    const existingUser=await authRepository.findUserByEmail(email);

    if(existingUser){
        throw new Error('User already exists!');
    }

    const hashPassword=await bcrypt.hash(password, 12);

    const verificationToken=crypto.randomBytes(32).toString("hex");

    const user=await authRepository.createUser({
        fullname, email, password:hashPassword, role, verificationToken
    });

    const verificationLink=`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/verify-email/${email}/${verificationToken}`;

    const userObj=user.toObject(); //Mongoose Document → Plain JavaScript Object
    delete userObj.password;

    return userObj;
}