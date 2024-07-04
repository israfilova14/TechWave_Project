const bcrypt = require('bcryptjs');
const userModel = require('../../modules/userModel');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, role = 'GENERAL' } = req.body; // Default role to 'user'
        console.log("req.body", req.body);

        if (!name) {
            return res.status(400).json({
                message: "Please provide name",
                error: true,
                success: false
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            });
        }

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use",
                error: true,
                success: false
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log("Hashed Password:", hashPassword);

        const payload = {
            name,
            email,
            password: hashPassword,
            role, 
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();
        console.log("Saved User:", saveUser);

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        let statusCode = 500;
        let message = err.message;

        if (err.name === 'ValidationError') {
            statusCode = 400;
            message = Object.values(err.errors).map(val => val.message).join(', ');
        }

        res.status(statusCode).json({
            message: message,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
