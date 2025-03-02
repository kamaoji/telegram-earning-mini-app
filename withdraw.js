function requestWithdrawal(amount, upiId) {
    let userId = auth.currentUser.uid;
    db.collection("users").doc(userId).get().then(doc => {
        let balance = doc.data().balance;

        if (balance >= amount) {
            db.collection("withdrawals").add({
                userId: userId,
                amount: amount,
                upiId: upiId,
                status: "pending",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert("Withdrawal request submitted!");
            });
        } else {
            alert("Insufficient balance!");
        }
    });
}
