
const productModel = require("../../modules/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req.body?.category || [];

        if (categoryList.length === 0) {
            return res.status(400).json({
                message: "No categories provided",
                error: true,
                success: false
            });
        }

        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        res.json({
            data: products,
            message: "Products retrieved successfully",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while retrieving products",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;