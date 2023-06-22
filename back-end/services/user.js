const UserModel = require("../models/user");

exports.getAllUsers = async () => {
    return await UserModel.find({});
}

exports.getUserById = async (id) => {
    return await UserModel.findById(id);
}

exports.updateUser = async (id, user) => {
    return await UserModel.findByIdAndUpdate(id, user);
}

exports.deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
}
