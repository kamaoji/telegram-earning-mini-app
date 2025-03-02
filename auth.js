auth.signInAnonymously().then(() => {
    let userId = auth.currentUser.uid;
    console.log("User Logged In:", userId);
    checkUserData(userId);
}).catch(error => {
    console.error("Authentication Error:", error);
});

// Check User Data in Firestore
function checkUserData(userId) {
    db.collection("users").doc(userId).get().then(doc => {
        if (!doc.exists) {
            db.collection("users").doc(userId).set({
                balance: 0,
                spins: 0,
                tasksCompleted: [],
                referralCount: 0,
                joinedChannel: false
            });
        }
    });
}
