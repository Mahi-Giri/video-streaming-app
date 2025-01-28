import { useEffect, useState } from 'react'
import { requestFCMToken,onMessageListener } from './firebaseUtils'
import { ToastContainer ,toast} from 'react-toastify'

const FcmToken = () => {
  const [fcmToken,setFcmToken] = useState(null) 
  useEffect(()=>{
       const fetchFCMToken = async () =>{
          try{
             const token = await requestFCMToken()    
             setFcmToken(token)
             console.log(token)   
          }catch(err){
              console.log("Error getting FCM token",err)      
          }          
       }
       fetchFCMToken()             
  }) 
  onMessageListener().then(payload =>{
      toast(
       <div>
          <strong>{payload.notification.title}</strong>  
          <strong>{payload.notification.body}</strong>         
       </div> ,        
       {position : "top-right"}    
      )              
      console.log("Recieved foreground message",payload)              
  }).catch(err=>console.log("Error",err))                
  return (
    <div>
       <ToastContainer/>             
      <h3>The Token Is :- {fcmToken}</h3>
    </div>
  )
}

export default FcmToken
