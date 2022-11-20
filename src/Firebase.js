import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCufH6GEbvFkLFvpTMXaXCHNNvHFKc9Xt0",
  authDomain: "chatapp-70fa6.firebaseapp.com",
  projectId: "chatapp-70fa6",
  storageBucket: "chatapp-70fa6.appspot.com",
  messagingSenderId: "123621220883",
  appId: "1:123621220883:web:6e9a26a50e2848817755e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app)

export const COLLECTIONS = {
  USERS : 'UsersData',
  CHATS : 'Chat',
}
/**
 * const firebaseConfig = {
  apiKey: "AIzaSyCufH6GEbvFkLFvpTMXaXCHNNvHFKc9Xt0",
  authDomain: "chatapp-70fa6.firebaseapp.com",
  projectId: "chatapp-70fa6",
  storageBucket: "chatapp-70fa6.appspot.com",
  messagingSenderId: "123621220883",
  appId: "1:123621220883:web:6e9a26a50e2848817755e6"
};
 */
