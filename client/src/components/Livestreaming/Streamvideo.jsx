import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import MessageContainer from './MessagesContainer'; // Assuming this component exists
import Invitation from './Invitation';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Streamvideo = () => {
  const videoRef = useRef(null);
  const webcamRefs = useRef([]);
  const [stream, setStream] = useState(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [chat, setChat] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const menuRef = useRef(null);
  const [meetingMembers,setgetMembers] = useState([]);
  const navigate = useNavigate()

  const user=useSelector(state=>state.user)

  console.log(dialog)
 



  const toggleChat = () => {
    setChat(!chat);
    setInvitation(false);
  };

  const toggleInvitation = () => {
    setChat(false);
    setInvitation(!invitation);
  };

  

  const meetingId=localStorage.getItem('meetingId');
  async function getParticipants(){
    try{
          const apiResponse=await fetch(`http://localhost:4444/api/v1/meeting/getParticipants/${meetingId}`,{
               method:"GET"
          })

          const apiResult=await apiResponse.json();
          console.log(apiResult);
          setgetMembers(apiResult.participants);

    }catch(err){

      console.error("Error fetching participants:", err.message);
        
    }

   }


   
  useEffect(()=>{
    getParticipants();
       
  },[])

  useEffect(() => {
    if (videoEnabled || micEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: micEnabled })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (webcamRefs.current.length > 0) {
            webcamRefs.current.forEach((ref) => {
              if (ref) ref.srcObject = mediaStream;
            });
          }
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (webcamRefs.current.length > 0) {
        webcamRefs.current.forEach((ref) => {
          if (ref) ref.srcObject = null;
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoEnabled, micEnabled]);

  const toggleMic = () => setMicEnabled((prev) => !prev);
  const toggleVideo = () => setVideoEnabled((prev) => !prev);

  const endCall = () => {
    setMicEnabled(false);
    setVideoEnabled(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (webcamRefs.current.length > 0) {
      webcamRefs.current.forEach((ref) => {
        if (ref) ref.srcObject = null;
      });
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    navigate('/')
  };

  return (
    <div className="flex flex-col  text-white p-6 relative">
      <div className="w-full flex  justify-between ml-3 lg:mb-3 ">
        <div className='flex  justify-center items-center flex-col mb:2 lg:mb-6 '> 
          <img
            src="https://media-hosting.imagekit.io//4801b3746d3c4127/download-removebg-preview.png?Expires=1832322424&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xfsbp5DDANmw01qNk8r5baqMxV7RcTh6DHRCFQEw6jZTKr7TMRaaBXhJlwj36-M4GltEdqVOBp6B8Jd1izVzJSYjJLDmeShqsGp6mE8m44d7HLgGmY5p9zV2A8CpJPI7OpvMDwXJkePEu30PBb2LX-2SEionh9cFiJbGcqrKcNjkA~yFMx7cLrem0Z4hGShi3xUitIzhw0ukcVPsKnxl83auk909TfTiCWRhUQrb-6NhTVRFUKU9N3Uas6n49Hy6ojXi2tMLGQdBjW-wDdWOTa22lF3nYvYbXJ6EsuD6TwYaR~~kk4yaRLQ3iw6uE6A50SZFAkdDZYJFAkw6Rn81CA__"
            alt="Logo"
            className="w-15 h-8 shadow-md"
          />
             <h6 className=' lg:text-lg'>Bustrion</h6> 
        
        </div>
        <h2 className="text-sm lg:text-2xl font-bold text-center w-full mt-3 lg:pl-10">Live Streaming</h2>
      </div>


      <div className="flex flex-col items-center ">
 
        <div className="flex justify-center items-center w-full md:flex md:justify-center md:h-[500px] lg:h-auto">

          <video className="rounded-lg border-4 border-gray-500 w-[90%] sm:w-[90%] md:w-[85%] lg:w-[50%]  md:h-[300px] lg:h-[250px]" controls>
            <source src="ReactJS.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-wrap lg:w-[80%] lg:justify-start items-center gap-4 mt-3">
  {meetingMembers &&
    meetingMembers.map((member, index) => (
      <div
        key={index}
        className="w-24 h-28 border-4 border-gray-700 rounded-lg overflow-hidden flex flex-col items-center"
      >
        <video
          ref={(el) => (webcamRefs.current[index] = el)}
          autoPlay
          playsInline
          muted
          className="w-full h-24 object-cover"
        />
       
        <p className="text-sm text-gray-200 mt-1 truncate w-full text-center">
          {member.username || "Unknown"} 
        </p>
      </div>
    ))}
</div>
      </div>
      <div className="flex lg:justify-center md:justify-center items-center space-x-4 p-4 fixed bottom-0 w-full sm:w-full ">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full text-white ${
            micEnabled ? 'border-white' : 'bg-red-500'
          } hover:bg-opacity-90 transition-colors`}
        >
          {micEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full text-white ${
            videoEnabled ? 'border-white' : 'bg-red-500'
          } hover:bg-opacity-90 transition-colors`}
        >
          {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button
          onClick={endCall}
          className="p-3 rounded-full text-white bg-red-600 hover:bg-opacity-90 transition-colors"
        >
          <FaPhoneSlash />
        </button>
        <button 
  onClick={() => setDialog((prev) => !prev)}  
  className="p-3 rounded-full bg-gray-600 hover:bg-opacity-80 text-white transition-colors relative"
  ref={menuRef}
>
  <CiMenuKebab />
</button>

{dialog && (
  <div className="bg-gray-700 rounded-lg shadow-lg absolute bottom-[60px]  left-[40%] lg:left-[52%] w-30 p-2 border border-gray-500 opacity-90 z-50">
    <p
      onClick={toggleChat}
      className="text-white hover:text-red-600 cursor-pointer mb-2 text-sm font-semibold"
    >
      Chat
    </p>
    <p
      onClick={toggleInvitation}
      className="text-white hover:text-red-500 cursor-pointer text-sm font-semibold"
    >
      Invitation
    </p>
  </div>
)}
      </div>

  
      {chat && (
        <div className="w-full mt-4">
          <MessageContainer chat={chat} setChat={setChat} />
        </div>
      )}

 
      {invitation && <Invitation />}
    </div>
  );
};

export default Streamvideo;
