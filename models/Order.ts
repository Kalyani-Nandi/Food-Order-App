const mongoose = require('mongoose');


const OrderSchema=new mongoose.Schema({
    customer:{
        type:String,
        required:true,
        maxlength:60,
    },
    phone:{
        type:Number,
        required:true,
        maxlength:10,
    },
    address:{
        type:String,
        required:true,
        maxlength:200,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        default:0,
    },
    method:{
        type:Number,
        required:true,
    },
   
},
{timestamps:true}
);

export default mongoose.model("Order",OrderSchema)
