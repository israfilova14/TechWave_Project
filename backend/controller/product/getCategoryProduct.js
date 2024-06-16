const productModel = require("../../modules/productModel");

const getCategoryProduct = async(req, res) => {
    try{
        const productCategory = await productModel.distinct("category")
        console.log("category", productCategory);
    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
module.exports = getCategoryProduct