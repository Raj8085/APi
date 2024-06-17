// const express = require('express');
// const urlRouter = require("./routes/url")
// const cookieParser = require("cookie-parser")
// const {connectToMongoDB} = require('./connect') 
// const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")
// const path = require('path')
// const app = express();
// const PORT = 8000;
// const URL = require("./models/url")
// const staticRoute = require("./staticRouter")
// const userRouter = require("./routes/user");


// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// app.use(cookieParser());
// connectToMongoDB("mongodb://127.0.0.1:27017/piyushshort-url").then(()=>console.log("MongoDB connnected"));

// app.set('view engine','ejs');
// app.set('views',path.resolve('./views'));

// app.use("/url",restrictToLoggedinUserOnly,urlRouter);
// app.use("/user",userRouter);
// app.use("/",checkAuth,staticRoute);


// app.get('/url/:shortId',async(req,res)=>{
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     },
//     {
//         $push:{
//             visitHistory:{
//                 timestamp : Date.now(),
//             },
//         },
//     }
// )
// res.redirect(entry.redirectURL);
// });

 
// app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`));


const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const { connectToMongoDB } = require('./connect');
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRoute = require("./staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongoDB("mongodb://127.0.0.1:27017/piyushshort-url");

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }, { new: true });

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
