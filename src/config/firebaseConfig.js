import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// var firebaseConfig = {
//     apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
//     authDomain: "todo-rrf-316.firebaseapp.com",
//     databaseURL: "https://todo-rrf-316.firebaseio.com",
//     projectId: "todo-rrf-316",
//     storageBucket: "todo-rrf-316.appspot.com",
//     messagingSenderId: "892398996038",
//     appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
//     measurementId: "G-TEGQB3MZ23"
// };

var firebaseConfig = {
    apiKey: "AIzaSyBLSFAR88aDuO5R-usdEQzThyu1MBr1KmA",
    authDomain: "cse316-hw3-todolist.firebaseapp.com",
    databaseURL: "https://cse316-hw3-todolist.firebaseio.com",
    projectId: "cse316-hw3-todolist",
    storageBucket: "cse316-hw3-todolist.appspot.com",
    messagingSenderId: "672241090322",
    appId: "1:672241090322:web:546f5952cdd779a1aafdcb",
    measurementId: "G-JMB7VCJH1Y"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;