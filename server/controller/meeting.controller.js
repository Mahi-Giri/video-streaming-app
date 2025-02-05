
import meetingModel from "../models/meeting.model.js";

const createMeeting=async(req,res)=>{
    
       try{

           const {meetingId,meetingHost,userId}=req.body;
        

           const meeting=new meetingModel({meetingId,meetingHost, participants: [userId] });

           await meeting.save();

           res.status(200).json({success:true,message:"Meeting created successfully",meeting});

       }catch(err){
            res.status(500).json({success:false,message:"Failed to create meeting"})
       }
}


const joinMeeting=async(req,res)=>{
       try{
                const {meetingId,userId}=req.body;
                console.log(meetingId,userId)

                const meeting=await meetingModel.findOne({meetingId});
                if(!meeting){
                      return res.status(404).send({success:false,message:"meeting is not found"})
                }
                if(!meeting.participants.includes(userId))
                meeting.participants.push(userId);
                await meeting.save();
                const userData=meeting.populate('participants','username');

                io.emit('userJoined',)

                res.status(200).json({success:true,message:"Meeting joined successfully",meeting});

       }catch(err){
          res.status(500).json({success:false,message:err.message});
       }
}

const getParticipants=async(request,res)=>{
       try{
              const {meetingId}=request.params;
              console.log(meetingId)
              const meeting=await meetingModel.findOne({meetingId}).populate('participants','username ');
              if(!meeting) return res.status(404).json({success:false,message:"Meeting not found"});

              res.status(200).json({success:true,participants:meeting.participants});

       }catch(err){
           res.status(500).json({success:false,message:err.message});
       }
}


export {createMeeting,joinMeeting,getParticipants}