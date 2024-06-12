 const userModel = require("../modules/userModel");

async function userDetailController(req, res) {
    try {
        console.log("userId", req.userId);
        // Check if user ID is provided
        if (!req.userId) {
            return res.status(401).json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        // Find user by ID
        const user = await userModel.findById(req.userId);
        // If user not found, return error
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }
        // Return user details
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User detail"
        });
    } catch (err) {
        // Handle any errors
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
module.exports = userDetailController;