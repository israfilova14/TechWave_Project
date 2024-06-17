const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productImage: {
        type: [String], // Array of strings for image URLs
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});

// Create the model from the schema
const productModel = mongoose.model('Product', productSchema);

// Export the model
module.exports = productModel;
