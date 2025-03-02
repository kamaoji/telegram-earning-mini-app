function spinWheel() {
    let userId = auth.currentUser.uid;
    db.collection("users").doc(userId).get().then(doc => {
        let spins = doc.data().spins;

        if (spins > 0) {
            let reward = Math.floor(Math.random() * 100); // Random reward
            db.collection("users").doc(userId).update({
                balance: firebase.firestore.FieldValue.increment(reward),
                spins: firebase.firestore.FieldValue.increment(-1)
            }).then(() => {
                alert(`You won ${reward} coins!`);
                updateUI();
            });
        } else {
            alert("No spins left!");
        }
    });
}
