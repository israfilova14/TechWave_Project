const  addToCartModel = require("../../modules/cartProduct")

const updateAddToCartProduct = async(req, res) => {
    try{
    const currentUserId = req.userId
    const addToCartProductId = req?.body?._id
    const quantity = req.body.quantity
    const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId}, {
        ...( quantity && {quantity : quantity})
    }) 
    res.json({
        message : "Product Updated",
        data : updateProduct,
        error : false,
        success : true
    })
    }catch(err){
        res.json({
            message : err?.message,
            error : true,
            success : false
        })
    }
}
module.exports = updateAddToCartProduct