const express = require('express')

const router = express.Router()

const authToken = require('../middleware/authToken')
const getCategoryProduct = require('../controller/product/getCategoryProduct')
const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductPermission = require('../helpers/permission')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const uploadProductController = require('../controller/product/uploadProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require ('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCardProduct = require('../controller/user/countAddToCardProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailController)
router.get("/userLogout", userLogout)

//admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user",authToken, updateUser)

//product
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product",authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)

//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCardProduct", authToken, countAddToCardProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
module.exports = router