const User=require('../user/user.model');

exports.getAllUsers = async () => {
    return await User.find({}, '_id'); // only fetch _id, no sensitive data
}