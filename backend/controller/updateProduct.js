// const uploadProductPermission = require("../helpers/permission");

// async function  updateProductController(req, res){
//     try{
//         if(!uploadProductPermission(req.userId)){
//             throw new Error("Permission denied")
//         }
//         const {_id, ...resBody} = req.resBody
//         const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)
//         res.json({
//             message: "Product update successfully",
//             data : updateProduct,
//             success : true,
//             error : false 
//         })
         

//     }catch(err){
//         res.status(500).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// } 
// module.exports = updateProductController
const uploadProductPermission = require("../helpers/permission");
const productModel = require("../modules/productModel");

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            });
        }

        const { _id, ...updateData } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateProductController;
