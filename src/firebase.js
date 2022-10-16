import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQzGkFPf4FrMFaUEf9_vndBPq-DQOY0Dw",
  authDomain: "memories-app-364922.firebaseapp.com",
  projectId: "memories-app-364922",
  storageBucket: "memories-app-364922.appspot.com",
  messagingSenderId: "758649408693",
  appId: "1:758649408693:web:5f4a3d106f737ee77e82fc",
  measurementId: "G-FPFRSML283"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

export {auth, provider}