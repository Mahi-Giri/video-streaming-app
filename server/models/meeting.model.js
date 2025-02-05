import mongoose from "mongoose";

const meetingSchema=new mongoose.Schema({
        meetingId:{type:String},
        participants:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        meetingHost:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
})

const meetingModel=mongoose.model('Meeting',meetingSchema);

export default meetingModel;