document.getElementById("spinButton").addEventListener("click", function() {
    let prizes = ["₹5", "₹10", "₹20", "₹50", "कोई इनाम नहीं"];
    let randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("result").innerText = "आपका इनाम: " + randomPrize;
});
