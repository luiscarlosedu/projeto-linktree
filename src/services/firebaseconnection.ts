import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-AJa_djZMrCZcHRz_OtnybGjQfSCIpp8",
  authDomain: "linktree-cb4b8.firebaseapp.com",
  projectId: "linktree-cb4b8",
  storageBucket: "linktree-cb4b8.appspot.com",
  messagingSenderId: "438105728101",
  appId: "1:438105728101:web:3c4d65bb8c80bab19b528c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {auth, db}