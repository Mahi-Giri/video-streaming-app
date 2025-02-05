import express from 'express'
import { invitationMail } from '../controller/invitation.controller.js';

const router=express.Router();


router.post('/invite',invitationMail)


export {router as invitationRoutuer};