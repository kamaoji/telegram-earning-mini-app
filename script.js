document.getElementById("spinButton").addEventListener("click", function() {
    let prizes = ["₹5", "₹10", "₹20", "₹50", "कोई इनाम नहीं"];
    let randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("result").innerText = "आपका इनाम: " + randomPrize;
});

document.getElementById("spinButton").addEventListener("click", function() {
    fetch("https://telegram-earning-mini-app.onrender.com/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "123456" })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.message;
    });
});


document.getElementById("checkJoin").addEventListener("click", function() {
    let userId = "123456"; // यहां Telegram User ID आएगी

    fetch("https://telegram-earning-mini-app.onrender.com/check_join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.joined) {
            document.getElementById("result").innerText = "आपने चैनल जॉइन कर लिया है!";
        } else {
            document.getElementById("result").innerText = "कृपया पहले चैनल जॉइन करें!";
        }
    });
});

document.getElementById("checkLike").addEventListener("click", function() {
    let userId = "123456"; // Telegram User ID
    let postId = "7890";   // Telegram Post ID

    fetch("https://telegram-earning-mini-app.onrender.com/check_like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, post_id: postId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.liked) {
            document.getElementById("result").innerText = "आपने पोस्ट को लाइक कर दिया है!";
        } else {
            document.getElementById("result").innerText = "कृपया पहले पोस्ट को लाइक करें!";
        }
    });
});

document.getElementById("checkVideo").addEventListener("click", function() {
    let userId = "123456"; // Telegram User ID

    fetch("https://telegram-earning-mini-app.onrender.com/check_video_watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.watched) {
            document.getElementById("result").innerText = "आपने वीडियो देख लिया!";
        } else {
            document.getElementById("result").innerText = "कृपया पूरा वीडियो देखें!";
        }
    });
});
