const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullname:{type:String, trim:true, required:true},
    email:{type:String, trim:true, unique:true, required:true},
    password:{type:String, trim:true, minlength:6, required:true},
    role:{type:String, enum:['user', 'admin'], default:'user', trim:true, required:true},
    isVerified:{type:Boolean, default:false},
    verificationToken:{type:String},
    resetToken:{type:String},
    resetTokenExpiration:{type:Date},

    resetOTP:{type:String},
    resetOTPExpiry:{type:Date},
    otpAttempts:{type:Number, default:0},
    otpBlockedUntil:{type:Date},

    signInAttempts:{type:Number, default:0},
    signInBlockedUntil:{type:Date},

    passwordHistory:[{type:String}],

    refreshToken:{type:String}
}, {timestamps:true})

module.exports=mongoose.model('User', userSchema);