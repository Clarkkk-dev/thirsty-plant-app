import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAUOo7ykN0n2gXRFR2ueOu0MmKPBOqsslY",
  authDomain: "thirsty-plant-9ae69.firebaseapp.com",
  projectId: "thirsty-plant-9ae69",
  storageBucket: "thirsty-plant-9ae69.appspot.com",
  messagingSenderId: "806188329024",
  appId: "1:806188329024:web:4886990a8f161f3741d7a5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);