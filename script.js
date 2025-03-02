const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const prizes = [5, 10, 15, 20, 25, 50, 75, 100]; // Rewards
let angle = 0;
let spinning = false;

// Spin Function
function startSpin() {
  if (spinning) return;
  spinning = true;
  let randomAngle = Math.floor(Math.random() * 360) + 1800; // Ensures multiple spins
  let finalAngle = angle + randomAngle;

  let spinTime = 4000; // Spin Time in ms
  let startTime = Date.now();

  function animateSpin() {
    let elapsedTime = Date.now() - startTime;
    let progress = elapsedTime / spinTime;
    
    if (progress < 1) {
      angle = finalAngle * progress;
      drawWheel();
      requestAnimationFrame(animateSpin);
    } else {
      angle = finalAngle % 360;
      spinning = false;
      let reward = getPrize(angle);
      document.getElementById("result").innerText = `🎉 You won ${reward} coins!`;
      updateBalance(reward);
    }
  }

  animateSpin();
}

// Draw Wheel Function
function drawWheel() {
  let sliceAngle = (2 * Math.PI) / prizes.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < prizes.length; i++) {
    let startAngle = i * sliceAngle;
    let endAngle = (i + 1) * sliceAngle;
    ctx.fillStyle = i % 2 === 0 ? "#FFCC00" : "#FF6600";
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, startAngle + angle * (Math.PI / 180), endAngle + angle * (Math.PI / 180));
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(prizes[i], 130 + 100 * Math.cos(startAngle + sliceAngle / 2 + angle * (Math.PI / 180)), 
                        140 + 100 * Math.sin(startAngle + sliceAngle / 2 + angle * (Math.PI / 180)));
  }
}

// Get Prize Based on Final Angle
function getPrize(angle) {
  let index = Math.floor(angle / (360 / prizes.length));
  return prizes[prizes.length - 1 - index];
}

// Update User Balance in Firebase
function updateBalance(amount) {
  let userId = "USER_TELEGRAM_ID"; // Replace with actual Telegram User ID
  let userRef = firebase.database().ref('users/' + userId);

  userRef.once('value', snapshot => {
    let currentBalance = snapshot.val()?.balance || 0;
    userRef.update({ balance: currentBalance + amount });
  });
}

// Initialize Wheel
drawWheel();
