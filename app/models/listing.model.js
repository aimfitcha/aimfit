import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    address:{
        type:String
    },
    mobile:{
        type:String,
    },
    joining_date:{
        type:String,

    },
    status:{
        type:Boolean,

    },
    shift:{
        type:String
    }
   
   
});

const listingModel = mongoose.models.listings || mongoose.model('listings',listingSchema);
export default listingModel