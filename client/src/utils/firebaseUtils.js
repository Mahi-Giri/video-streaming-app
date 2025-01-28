// import { resolve } from "path";
import { app } from "../firebase";
import { getMessaging, getToken,onMessage} from "firebase/messaging";

const vapidKey =
  "BHttq-1ESLtn7y838UGjMuvurZKLiceoXkVXA928vN7lv5gBfHTdztxQnlTpZeRZ-VTgV8XQ7bwOMZpvuTDOW4Y";

// Initialize Firebase Messaging
const messaging = getMessaging(app);

/**
 * Request FCM Token
 * @returns {Promise<string>} - Returns the FCM token if granted, throws an error otherwise
 */
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey });
      console.log("FCM Token:", token);
      return token;
    } else {
      throw new Error("Notification permission not granted.");
    }
  } catch (err) {
    console.error("Error getting FCM token:", err);
    throw err;
  }
};

export const onMessageListener = ()=>{
    return new Promise((resolve)=>{
         onMessage(messaging,(payload)=>{
             resolve(payload)       
         })           
     })              
}