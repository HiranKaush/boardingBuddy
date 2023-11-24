import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBCfCHcnK5ot7UJZVpsp-XqDdRzW_rmoeE",
    authDomain: "boardingbuddy-dd998.firebaseapp.com",
    projectId: "boardingbuddy-dd998",
    storageBucket: "boardingbuddy-dd998.appspot.com",
    messagingSenderId: "227669059232",
    appId: "1:227669059232:web:7c8489ee026ecd87efcbc5",
    measurementId: "G-H6WYHFZWJR"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }


  export {firebase};