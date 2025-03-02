// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqzbS0CeWAn8jeRF1E4CpKW25uH58DsMs",
    authDomain: "telegramearningbot.firebaseapp.com",
    databaseURL: "https://telegramearningbot-default-rtdb.firebaseio.com",
    projectId: "telegramearningbot",
    storageBucket: "telegramearningbot.appspot.com",
    messagingSenderId: "883236360921",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-ABCDEFGH"
};

// 🔄 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 📌 User Data
let userID = "USER_" + Math.random().toString(36).substr(2, 9);
let balanceRef = db.ref("users/" + userID + "/balance");

// 🎡 Spin Function
document.getElementById("spin-btn").addEventListener("click", function () {
    balanceRef.once("value", (snapshot) => {
        let balance = snapshot.val() || 0;
        if (balance > 0) {
            let randomSpin = Math.floor(Math.random() * 10) + 1;
            document.getElementById("spin-wheel").style.transform = `rotate(${randomSpin * 36}deg)`;
            balanceRef.set(balance - 1);
        } else {
            alert("❌ Spins khatam! Task complete karo ya refer karo.");
        }
    });
});

// 📢 Channel Join Popup (5 sec delay)
setTimeout(() => {
    document.getElementById("join-popup").style.display = "block";
}, 5000);

// 📢 Join Channel Button Click
document.getElementById("join-channel").addEventListener("click", function () {
    db.ref("users/" + userID + "/joinedChannel").set(true);
    db.ref("users/" + userID + "/balance").set(3);
    document.getElementById("join-popup").style.display = "none";
});

// 📌 Task Completion Rewards
document.querySelectorAll(".task-btn").forEach(button => {
    button.addEventListener("click", function () {
        balanceRef.once("value", (snapshot) => {
            let balance = snapshot.val() || 0;
            balanceRef.set(balance + 1);
        });
    });
});

// 👥 Referral System (1 Spin per Refer)
document.getElementById("refer-earn").addEventListener("click", function () {
    let referralID = prompt("Apne doston ke saath yeh referral link share karein:");
    alert("✅ Referral successful! Aapko 1 free spin mila.");
    balanceRef.once("value", (snapshot) => {
        let balance = snapshot.val() || 0;
        balanceRef.set(balance + 1);
    });
});

// 💸 UPI Withdrawal
document.getElementById("withdraw").addEventListener("click", function () {
    balanceRef.once("value", (snapshot) => {
        let balance = snapshot.val() || 0;
        if (balance >= 10) {
            let upiID = prompt("Apna UPI ID daaliye:");
            alert(`✅ Withdrawal Request Sent for ₹${balance} to ${upiID}`);
            balanceRef.set(0);
        } else {
            alert("❌ Minimum balance ₹10 hona chahiye!");
        }
    });
});
