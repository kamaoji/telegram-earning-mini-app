// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqzbS0CeWAn8jeRF1E4CpKW25uH58DsMs",
    authDomain: "telegramearningbot.firebaseapp.com",
    projectId: "telegramearningbot",
    storageBucket: "telegramearningbot.firebasestorage.app",
    messagingSenderId: "883236360921",
    appId: "1:883236360921:web:aa79b5bbb64892f6e2a4c8",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
