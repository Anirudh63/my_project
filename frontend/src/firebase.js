// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQwR2XcvXy_dosnwSbOSqhxpcDZB8sB8E",
  authDomain: "notewise-9af85.firebaseapp.com",
  projectId: "notewise-9af85",
  storageBucket: "notewise-9af85.firebasestorage.app",
  messagingSenderId: "851770441029",
  appId: "1:851770441029:web:6064567526e3265ff7922c",
  measurementId: "G-MD17R2099L"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
