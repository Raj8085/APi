const mongoose = require("mongoose");

// uri = "mongodb+srv://patelrajeev10342:jKzmhJb3OoOqLiAq@rajeevapi.zlyggb6.mongodb.net/RajeevApi?retryWrites=true&w=majority&appName=RajeevApi";

const connectDB =(uri)=>{
    console.log("connect db")
    return mongoose.connect(uri);
};

module.exports = connectDB;