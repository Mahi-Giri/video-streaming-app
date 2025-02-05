import express from "express";
import { createMeeting, getParticipants, joinMeeting } from "../controller/meeting.controller.js";

const router=express.Router();


router.post('/createMeeting',createMeeting)
router.post('/joinMeeting',joinMeeting)
router.get('/getParticipants/:meetingId',getParticipants)


export {router as meetingRouter};