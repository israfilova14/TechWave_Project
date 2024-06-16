// async function allUsers(req, res){
//     try{
//       console.log("userid all Users", req.userId);
//       res.json({
//         message : "All Users"
//       })
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//           })
//     }
// }

const userModel = require("../../modules/userModel");

// module.exports = allUsers
async function allUsers(req, res) {
    try {
        console.log("Entering allUsers function");  // Log when function is called
        console.log("userid all Users", req.userId);  // Log the userId
        const allUsers = await userModel.find()
        res.json({
            message: "All Users",
            data :  allUsers,
            success : true,
            error: false
        });
        console.log("Response sent");  // Log when response is sent
    } catch (err) {
        console.log("Error in allUsers function");  // Log when an error occurs
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = allUsers;
