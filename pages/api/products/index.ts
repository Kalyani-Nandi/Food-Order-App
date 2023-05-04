
import dbConnect from "../../../utils/mongo";
// const Product= require("../../../models/Product")
const mongoose = require('mongoose');

var Product = mongoose.model("Product")
export default async function handler(req: {
    body(body: any): unknown; method: any; cookies: any; 
}, res: any) {
    const { method, cookies } = req;
    dbConnect();

    if(method === "GET") {
        try{
           const products=await Product.find();
           console.log(products);
           
           res.status(200).json(products); 
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if(method === "POST") {
        try{
           const product=await Product.create(req.body);
           res.status(200).json(product); 
        } catch (err) {
            res.status(500).json(err);
        }
    }
}