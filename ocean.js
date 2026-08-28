// BTC Ocean — Canvas Engine (Version 1)
// Minimalist storm-building ocean foundation

const canvas = document.getElementById("btc-ocean");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Ocean state
let waveOffset = 0;
let skyMood = 0.4; // 0 = fear (dark), 1 = greed (bright)

// Main animation loop
function animate() {
  drawSky();
  drawOcean();
  requestAnimationFrame(animate);
}
animate();

// --- SKY -------------------------------------------------------------

function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);

  // Storm-building sky (Fear & Greed mood)
  const darkGrey = "#2a2e33";
  const steelBlue = "#3c4f63";
  const lightningBlue = "#4fb3ff";

  gradient.addColorStop(0, darkGrey);
  gradient.addColorStop(0.7, steelBlue);
  gradient.addColorStop(1, lightningBlue);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
}

// --- OCEAN -----------------------------------------------------------

function drawOcean() {
  const oceanTop = canvas.height * 0.6;

  // Ocean background
  const oceanGradient = ctx.createLinearGradient(0, oceanTop, 0, canvas.height);
  oceanGradient.addColorStop(0, "#0a1a2f"); // deep navy
  oceanGradient.addColorStop(1, "#1c1f22"); // charcoal

  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, oceanTop, canvas.width, canvas.height);

  // Waves (simple sine wave for now)
  const waveHeight = 20;
  const waveLength = 180;
  waveOffset += 0.015; // smooth motion

  ctx.beginPath();
  ctx.moveTo(0, oceanTop);

  for (let x = 0; x < canvas.width; x++) {
    const y =
      oceanTop +
      Math.sin((x + waveOffset * 200) / waveLength) * waveHeight;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();

  ctx.fillStyle = "#1c1f22"; // charcoal wave fill
  ctx.fill();

  // Foam highlight
  ctx.strokeStyle = "#c7d1d9"; // silver foam
  ctx.lineWidth = 1.2;
  ctx.stroke();
}
