require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect")
const PORT = process.env.PORT || 7009;

const products_routes = require("./routes/products")

app.get("/",(req,res)=>{
    res.send("Hi, i am live");
});

//middleware

app.use("/api/products",products_routes)


const start = () => {
    try {
        // await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,async()=>{
           console.log(`Server started at PORT ${PORT}`)
           await connectDB(process.env.MONGODB_URL);
        })
        // await connectDB(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
    }
};
start();

