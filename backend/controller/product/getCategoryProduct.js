const productModel = require("../../modules/productModel");

const getCategoryProduct = async(req, res) => {
    try{
        const productCategory = await productModel.distinct("category")
        console.log("category", productCategory);
        //array to store one product for each category
        const productByCategory = []
        for(const category of productCategory){
            const product = await productModel.findOne({category : category})
            if(product){
                productByCategory.push(product)
            }
        }
        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}
module.exports = getCategoryProduct
// const productModel = require("../../modules/productModel");

// const getCategoryProduct = async (req, res) => {
//     try {
//         const productCategory = await productModel.distinct("category");
//         console.log("Categories:", productCategory);

//         // Fetch one product for each category in parallel
//         const productByCategory = await Promise.all(
//             productCategory.map(async (category) => {
//                 return productModel.findOne({ category });
//             })
//         );

//         // Filter out null values in case some categories have no products
//         const filteredProducts = productByCategory.filter(product => product);

//         res.json({
//             message: "Category products retrieved successfully",
//             data: filteredProducts,
//             success: true,
//             error: false
//         });

//     } catch (err) {
//         console.error("Error retrieving category products:", err);
//         res.status(500).json({
//             message: err.message || "Internal Server Error",
//             error: true,
//             success: false
//         });
//     }
// };

// module.exports = getCategoryProduct;
