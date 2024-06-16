//  const bcrypt = require('bcryptjs');
// const userModel = require('../modules/userModel');
// const jwt = require('jsonwebtoken');

// async function userSignInController(req, res) {
//     try {
//         const { email, password } = req.body;

//         if (!email) {
//             return res.status(400).json({
//                 message: "Please provide email",
//                 error: true,
//                 success: false
//             });
//         }
//         if (!password) {
//             return res.status(400).json({
//                 message: "Please provide password",
//                 error: true,
//                 success: false
//             });
//         }

//         const existingUser = await userModel.findOne({ email: email });
//         if (!existingUser) {
//             return res.status(404).json({
//                 message: "User not found",
//                 error: true,
//                 success: false
//             });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

//         if (!isPasswordMatch) {
//             return res.status(401).json({
//                 message: "Invalid email or password",
//                 error: true,
//                 success: false
//             });
//         }

//         const tokenData = {
//             _id: existingUser._id,
//             email: existingUser.email
//         };

//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

//         const tokenOption = {
//             httpOnly: true,
//             secure: true
//         };

//         res.cookie("token", token, tokenOption).json({
//             message: "Login successful",
//             data: token,
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         res.status(500).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = userSignInController;
const bcrypt = require('bcryptjs');
const userModel = require('../../modules/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            });
        }

        // Find user by email
        const existingUser = await userModel.findOne({ email: email });

        // If user not found, return error
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Compare provided password with hashed password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        // If password doesn't match, return error
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                error: true,
                success: false
            });
        }

        // Create token payload
        const tokenData = {
            _id: existingUser._id,
            email: existingUser.email
        };

        // Sign JWT with token payload and secret key
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        // Set token as a cookie in the response
        const tokenOption = {
            httpOnly: true,
            secure: true // Ensure to set secure flag in production
        };
        res.cookie("token", token, tokenOption);

        // Return success response with token
        res.json({
            message: "Login successful",
            data: token,
            success: true,
            error: false
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

module.exports = userSignInController;
