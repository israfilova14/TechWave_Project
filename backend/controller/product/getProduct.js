const productModel = require("../../modules/productModel");

const getProductController = async(req, res) => {
  try{
      const allProduct = await productModel.find().sort({createdAt : -1})
      res.json({
        message : "All Product",
        success: true,
        error : false,
        data : allProduct
      })
  }catch(err){
      // Handle any errors
      res.status(500).json({
        message : err.message || err,
        error : true,
        success : false
    });
  }
}
module.exports = getProductController