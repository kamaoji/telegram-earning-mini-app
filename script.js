document.addEventListener("DOMContentLoaded", function () {
    // Show Join Channel Popup after 5 sec
    setTimeout(() => {
        document.getElementById("join-popup").style.display = "block";
    }, 5000);
});

function spinWheel() {
    let wheel = document.getElementById("wheel");
    let spins = Math.floor(Math.random() * 3600);
    wheel.style.transform = `rotate(${spins}deg)`;

    setTimeout(() => {
        alert("🎉 Congratulations! You won some spins.");
    }, 3000);
}

function claimBonus() {
    alert("🎁 Daily Bonus Claimed!");
}

function showJoinPopup() {
    document.getElementById("join-popup").style.display = "block";
}

function verifyJoin() {
    // Simulated Verification
    document.getElementById("spin-count").innerText = 3;
    alert("✅ Channel Joined! You got 3 Free Spins.");
    document.getElementById("join-popup").style.display = "none";
}
