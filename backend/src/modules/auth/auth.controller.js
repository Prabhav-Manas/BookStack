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