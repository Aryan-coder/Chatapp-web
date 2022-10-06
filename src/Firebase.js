import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3PBUqdUPePWXlkIaOETNOyfE7dQ9FGIk",
  authDomain: "chatapp-50e91.firebaseapp.com",
  projectId: "chatapp-50e91",
  storageBucket: "chatapp-50e91.appspot.com",
  messagingSenderId: "57824783235",
  appId: "1:57824783235:web:87fa0df0c2ae6c7b7e64b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app)

export const COLLECTIONS = {
  USERS : 'UsersData',
  CHATS : 'Chat',
}
