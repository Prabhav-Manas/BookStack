const userRepository=require('../user/user.repository');

exports.getTotalUsersService = async () => {
    const users = await userRepository.getAllUsers();
    return users.length;
}