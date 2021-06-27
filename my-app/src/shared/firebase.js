import firebase from "firebase/app";

// 사용할 것들을 전부 불러옵니다 :)
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCnpg21OsrDwCMGswTFgpUIHMUPZiDVBAA",
  authDomain: "instagram-be258.firebaseapp.com",
  projectId: "instagram-be258",
  storageBucket: "instagram-be258.appspot.com",
  messagingSenderId: "833659867310",
  appId: "1:833659867310:web:785c790d1a57f1fc0e9d3f",
  measurementId: "G-DFH3QGV819"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
