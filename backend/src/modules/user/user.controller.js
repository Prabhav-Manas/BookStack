const userService=require('../user/user.service');

exports.getTotalUsers = async (req, res, next) => {
    try {
        const totalUsers = await userService.getTotalUsersService();
        res.status(200).json({
            status: 200,
            message: 'Total users fetched!',
            totalUsers
        });
    } catch (error) {
        next(error);
    }
}