import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_zUjVbdJ6NE6AtZUw0ZOkL7_DlSlJlwU",
  authDomain: "jp-energy-200cf.firebaseapp.com",
  projectId: "jp-energy-200cf",
  storageBucket: "jp-energy-200cf.appspot.com",
  messagingSenderId: "556202778939",
  appId: "1:556202778939:web:d93362fdbb87313608971e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export default app;
