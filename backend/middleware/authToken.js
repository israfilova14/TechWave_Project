// const jwt = require('jsonwebtoken')
// async function authToken(req, res, next){
//     try{
//         const token = req.cookies?.token 
//         console.log("token", token);
//         if(!token){
//             return res.status(200).json({
//                 message : "User not Login",
//                 error : true,
//                 success : false
//             })
//         }
//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
//              console.log(err);
//              console.log("decoded", decoded);
//              if(err){
//                 console.log("error auth", err);
//              }
//              req.userId = decoded?._id
//              next()
//           });
//         console.log("token", token);
//     }catch(err){
//        res.status(400).json({
//         message : err.message || err,
//         data : [],
//         error : true,
//         success : false
//        })
//     }
// }
// module.exports = authToken
const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Extract token from cookies
        const token = req.cookies?.token;

        // If token is missing, return 401 (Unauthorized)
        if (!token) {
            return res.status(401).json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            // If token is invalid or expired, return 401 (Unauthorized)
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }
            
            // Store user ID in request object
            req.userId = decoded?._id;
            next(); // Move to the next middleware
        });
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
