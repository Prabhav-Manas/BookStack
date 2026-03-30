const authService=require('./auth.service');

exports.signup=async(req, res, next)=>{
    try{
        const user = await authService.createUserService(req.body);

        res.status(201).json({
            status:201,
            message:'User created succesfully!',
            user:user
        })
    }catch(error){
        next(error);
    }
}

exports.verifyEmail=async(req, res, next)=>{
    try{
    const {email, token}=req.params;

    await authService.verifyEmailService(email, token);

    res.status(200).json({
        status:200,
        message:'Email verified successfully!'
    })
    }catch(error){
        next(error);
    }
}