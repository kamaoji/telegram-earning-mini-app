function checkChannelJoin() {
    let userId = auth.currentUser.uid;
    fetch(`https://api.telegram.org/bot7700519873:AAH2o689zcZp5Muppow4gWUflqqIoDcn0AA/getChatMember?chat_id=@DESIARUNGAMERS&user_id=${userId}`)
    .then(response => response.json())
    .then(data => {
        if (data.ok && (data.result.status === "member" || data.result.status === "administrator")) {
            db.collection("users").doc(userId).update({
                joinedChannel: true,
                spins: firebase.firestore.FieldValue.increment(3)
            }).then(() => {
                alert("Channel Joined! You got 3 free spins.");
                document.getElementById("channelPopup").style.display = "none";
            });
        } else {
            alert("Please join the channel to proceed!");
        }
    });
}
