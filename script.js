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
