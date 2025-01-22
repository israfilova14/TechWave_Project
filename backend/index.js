const express = require('express')
const cors = require ('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')
const router = require('./routes/index')

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
    
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api", router)

const PORT = process.env.PORT || 8080

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB");
        console.log("Server is running");
    })
})
