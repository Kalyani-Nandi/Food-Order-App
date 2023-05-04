

import dbConnect from "../../../utils/mongo";
const mongoose = require('mongoose');

var Product = mongoose.model('Product')

export default async function handler(req:any, res: any) {
    const { method ,query:{ id },cookies } = req;
    dbConnect();

    if(method === "GET") {
        try{
           const product=await Product.findById(id);
           res.status(200).json(product); 
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if(method === "PUT") {
        try{
           const product=await Product.create(req.body);
           res.status(200).json(product); 
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
    if(method === "DELETE") {
        try{
           const product=await Product.create(req.body);
           res.status(200).json(product); 
        } catch (err) {
            res.status(500).json(err);
        }
    }
}