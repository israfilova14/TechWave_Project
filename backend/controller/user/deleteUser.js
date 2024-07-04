const userModel = require("../../modules/userModel");

const deleteUser = async (req, res) => {
    try {
        const userId = req.body._id;

        const deleteUser = await userModel.deleteOne({ _id: userId });
        res.json({
            message: "User Deleted Successfully",
            error: false,
            success: true,
            data: deleteUser
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteUser;