// const userModel = require("../modules/userModel")

// const uploadProductPermission = async(userId) => {
//     const user = await userModel.findById(userId)

//     if(user.role === 'ADMIN'){
//         return true
//     }

//     return false
// }
// module.exports = uploadProductPermission
const userModel = require("../modules/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (user && user.role === 'ADMIN') {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error in uploadProductPermission:", error);
        return false;
    }
};

module.exports = uploadProductPermission;
