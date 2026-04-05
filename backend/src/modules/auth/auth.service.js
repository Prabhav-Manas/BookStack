const User=require('../user/user.model');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {sendEmail}=require('../../utils/mailer');
const {generateAccessToken, generateRefreshToken}=require('../../config/jwt');

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

    const verificationLink=`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/verify-email/${verificationToken}`;

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
exports.verifyEmailService = async (token) => {

    const user = await authRepository.findUserByVerificationToken(token);

    if (!user) {
        // throw catchError(400, 'Invalid or expired verification link');
            return {
                message: "Email already verified"
            };
    }

    if (user.isVerified) {
        // throw catchError(400, 'Email already verified');
            return {
                message: "Email already verified"
            };
    }

    const verifiedUser = await authRepository.verifyUser(user._id);

    return verifiedUser;
};

exports.resendVerificationEmailService = async (email) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.isVerified) {
        throw new Error('Email already verified');
    }

    const verificationToken =
    crypto.randomBytes(32).toString('hex');

    await User.findByIdAndUpdate(
        user._id,
        { verificationToken }
    );

    const link =`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/verify-email/${verificationToken}`;

    const html = `
        <h3>Verify your email</h3>
        <a href="${link}">
        Verify Email
        </a>
    `;

    await sendEmail(email, 'Verify Email', html);

    return true;
};

exports.signinService = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error('All fields are required');
    }

    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new Error('Email not found');
    if (!user.isVerified) throw new Error('Please verify your email first');

    // Reset block if expired
    if (user.signInBlockedUntil && user.signInBlockedUntil < Date.now()) {
        await User.findByIdAndUpdate(user._id, {
            signInAttempts: 0,
            signInBlockedUntil: null
        });
    }

    // Block check
    if (user.signInBlockedUntil && user.signInBlockedUntil > Date.now()) {
        throw new Error('Too many failed attempts. Try again later.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        const attempts = user.signInAttempts + 1;
        if (attempts >= 5) {
            await User.findByIdAndUpdate(user._id, {
                signInAttempts: 0,
                signInBlockedUntil: Date.now() + 15 * 60 * 1000
            });
            throw new Error('Too many login attempts. Try again after 15 minutes.');
        }

        await User.findByIdAndUpdate(user._id, { signInAttempts: attempts });
        throw new Error('Invalid credentials');
    }

    await User.findByIdAndUpdate(user._id, { signInAttempts: 0, signInBlockedUntil: null });

    // Generate JWT token
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id, { refreshToken });

    // Only send back necessary info
    const userObj = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
    };

    return { user: userObj, accessToken, refreshToken };
};

exports.refreshTokenService=async(token)=>{
    if(!token){
        throw new Error('Refresh token required.');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        throw new Error('Refresh token expired');
    }

    const user=await User.findById(decoded.id);

    if(!user || user.refreshToken !== token){
        throw new Error('Invalid refresh token');
    }

    const newAccessToken=generateAccessToken(user._id);

    return newAccessToken;
}

exports.forgotPasswordService = async (data) => {
  const { email } = data;

  if (!email) throw new Error('Email is required');

  const user = await authRepository.findUserByEmail(email);
  if (!user) throw new Error('Email not found');

  const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(resetOTP, 12);
  const resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes as Date

  await authRepository.saveResetToken(email, null, null, hashedOtp, resetOTPExpiry);
  await User.findByIdAndUpdate(user._id, { otpAttempts: 0, otpBlockedUntil: null });

  const html = `
    <p>Use the OTP below to reset your password:</p>
    <h2>${resetOTP}</h2>
    <p>OTP expires in 10 minutes.</p>
  `;
  await sendEmail(user.email, 'Password Reset OTP', html);

  return true;
};

exports.verifyOtpService = async ({ email, otp }) => {
  if (!email || !otp) throw new Error('Email and OTP are required');

  const user = await authRepository.findUserByEmail(email);
  if (!user || !user.resetOTP) throw new Error('Invalid or expired OTP');

  // Block check
  if (user.otpBlockedUntil && user.otpBlockedUntil > Date.now()) {
    throw new Error('Too many OTP attempts. Try again later.');
  }

  // Expiry check
  if (user.resetOTPExpiry < new Date()) throw new Error('OTP expired');

  const isOtpMatch = await bcrypt.compare(otp, user.resetOTP);

  if (!isOtpMatch) {
    const attempts = user.otpAttempts + 1;
    if (attempts >= 5) {
      await User.findByIdAndUpdate(user._id, {
        otpAttempts: 0,
        otpBlockedUntil: new Date(Date.now() + 10 * 60 * 1000),
      });
      throw new Error('Too many attempts. OTP blocked for 10 minutes.');
    }

    await User.findByIdAndUpdate(user._id, { otpAttempts: attempts });
    throw new Error('Invalid OTP');
  }

  // Correct OTP → reset attempts & generate reset token
  await User.findByIdAndUpdate(user._id, { otpAttempts: 0, otpBlockedUntil: null });

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await authRepository.saveResetToken(email, resetToken, resetTokenExpiry, null, null);

  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/reset-password/${resetToken}`;
  const html = `<p>Click this link to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>Link expires in 1 hour.</p>`;
  await sendEmail(user.email, 'Reset Your Password', html);

  return resetToken; // <-- important
};

exports.resendOtpService = async (email) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('Email not found');
    }

    // Prevent OTP spam
    // if (user.resetOTPExpiry && user.resetOTPExpiry > Date.now()) {
    //     throw new Error('OTP already sent. Please wait before requesting again.');
    // }

    const cooldown = 30 * 1000;

    if (user.resetOTPRequestedAt && (Date.now() - user.resetOTPRequestedAt < cooldown)) {
        throw new Error('Please wait before requesting another OTP');
    }

    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(resetOTP, 12);
    const resetOTPExpiry = Date.now() + 10 * 60 * 1000;

    await authRepository.saveResetToken(email, null, null, hashedOtp, resetOTPExpiry);

    const html = `
        <p>Your new OTP:</p>
        <h2>${resetOTP}</h2>
        <p>Expires in 10 minutes</p>
    `;

    await sendEmail(email, 'Resend OTP', html);

    return true;
};

exports.resetPasswordService=async(data)=>{
    const{token, password}=data;

    if(!token || !password){
        throw new Error('All fields are required');
    }

    const user=await authRepository.findUserByResetToken(token);

    if(!user){
        throw new Error('Invalid or expired reset token');
    }

    // Check against current password
    const isSameAsCurrent = await bcrypt.compare(password, user.password);
    if (isSameAsCurrent) {
        throw new Error('New password cannot be same as current password');
    }

    // Check last 2 passwords
    if (user.passwordHistory && user.passwordHistory.length > 0) {
        for (let oldPassword of user.passwordHistory.slice(-2)) {
            const isMatch = await bcrypt.compare(password, oldPassword);
            if (isMatch) {
                throw new Error('You cannot reuse your last 2 passwords');
            }
        }
    }

    const hashedPassword=await bcrypt.hash(password, 12);

    // Push current password to history
    const updatedHistory = [...(user.passwordHistory || []), user.password];

    // Keep only last 2 passwords
    const trimmedHistory = updatedHistory.slice(-2);

    await authRepository.updatePassword(user._id, hashedPassword, trimmedHistory);

    return true;
}

exports.logoutService = async (refreshToken) => {
    if (!refreshToken) {
        return true; // logout should still succeed
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        await User.findByIdAndUpdate(decoded.id, {
            refreshToken: null
        });

    } catch (error) {
        // Even if token expired, logout should still succeed
        return true;
    }

    return true;
};