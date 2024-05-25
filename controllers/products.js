// const Product = require("../models/product");

// const getAllProducts = async(req,res) => {
//     const myData = await Product.find({});
//     res.status(200).json({myData,msg:"I am getAllProducts"})
// };

// const getAllProductsTesting = async(req,res) => {
//     const mydata = await Product.find(req.query)
//     console.log(req.query);
//     res.status(200).json({mydata});
// };

// module.exports = {
//     getAllProducts,
//     getAllProductsTesting,
// };


const Product = require("../models/product");


 

const getAllProducts = async (req, res) => {
    const {company,name,featured,sort,select} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(featured){
        queryObject.featured = featured;
    }


    if(name){
        queryObject.name = { $regex: name, $options:"i"};
    }
    console.log('name',queryObject);


    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix)
    }
    if(select){
        // let selectFix = select.replace(","," ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);


    const myData = await apiData;
    res.status(200).json({ myData, nbHits : myData.length});
};

const getAllProductsTesting = async (req, res) => {
    console.log(req.query);
    console.log("Received query parameters:", req.query);
    try {
        // const mydata = await Product.find(req.query).sort('-name');
        // const mydata = await Product.find(req.query).sort('name price');
        const mydata = await Product.find(req.query).select("name company");
        console.log("Queried data:", mydata);
        res.status(200).json({ mydata });
    } catch (error) {
        console.error("Error querying data:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getAllProductsTesting,
};
