importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyDqZehAW2IbCLTuFlI73vyX-AlgScnY6kk",
  authDomain: "fir-push-notifications-736c2.firebaseapp.com",
  projectId: "fir-push-notifications-736c2",
  storageBucket: "fir-push-notifications-736c2.firebasestorage.app",
  messagingSenderId: "520762113820",
  appId: "1:520762113820:web:9a24acec07d8eb3e1244d9",
  measurementId: "G-N5R39SPWD4"
};

firebase.initializeApp(firebaseConfig)

//Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload){
    console.log("Received background message",payload)                
})
