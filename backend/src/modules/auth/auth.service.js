const User=require('../user/user.model');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {sendEmail}=require('../../utils/mailer');

const catchError=require('http-errors');

// Create User service
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
        fullname, email, password:hashPassword, role:role.toLowerCase(), verificationToken
    });

    const verificationLink=`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/verify-email/${email}/${verificationToken}`;

    const html=`
        <div style="display:block, background-color:lime">
            <p>Click the below link to verify your email:</p>
            <a href="${verificationLink}">Click here to Verify</a>
        </div>
    `
    // await sendEmail(user.email, 'Verify your Email', html);

    try {
        await sendEmail(user.email, 'Verify Email', html);
        } catch (err) {
        console.warn('Email sending failed, but signup continues:', err.message);
    }

    const userObj=user.toObject(); //Mongoose Document → Plain JavaScript Object
    delete userObj.password;

    return userObj;
}

// Verify-Email Service
exports.verifyEmailService=async(email, token)=>{
    const user=await authRepository.findUserByEmail(email);

    if(!user){
        throw catchError(404, 'User not found');
    }

    if(user.isVerified){
        throw catchError(400, 'User already verified');
    }

    if(user.verificationToken!==token){
        throw catchError(400, 'Invalid token!');
    }

    const verifiedUser=await authRepository.verifyUser(email);

    return verifiedUser;
}