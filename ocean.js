// BTC Ocean — Canvas Engine (Version 2)
// Now connected to SkyEngine, SwellEngine, WavePhysics, DataEngine

let waveOffset = 0;

const canvas = document.getElementById("btc-ocean");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Global wave parameters (WavePhysics will override these)
window.waveHeight = 20;
window.waveFroth = 0.0;
window.macroSwell = 0.0;

// Main animation loop
function animate() {
  SkyEngine.applyToOcean(ctx, canvas);  // draw sky
  SwellEngine.draw(ctx, canvas);        // draw macro swell
  drawOcean();                          // draw waves
  requestAnimationFrame(animate);
}
animate();

// --- OCEAN -----------------------------------------------------------

function drawOcean() {
  const oceanTop = canvas.height * 0.6;

  // Ocean background gradient
  const oceanGradient = ctx.createLinearGradient(0, oceanTop, 0, canvas.height);
  oceanGradient.addColorStop(0, "#0a1a2f"); // deep navy
  oceanGradient.addColorStop(1, "#1c1f22"); // charcoal

  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, oceanTop, canvas.width, canvas.height);

  // Waves (WavePhysics controls height + speed)
  const waveHeight = window.waveHeight;
  const waveLength = 180;
  waveOffset += WavePhysics.speed;

  ctx.beginPath();
  ctx.moveTo(0, oceanTop);

  for (let x = 0; x < canvas.width; x++) {
    const y =
      oceanTop +
      Math.sin((x + waveOffset * 200) / waveLength) * waveHeight +
      window.macroSwell * 0.2; // macro swell influence
    ctx.lineTo(x, y);
  }

  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();

  ctx.fillStyle = "#1c1f22"; // charcoal wave fill
  ctx.fill();

  // Foam (volatility)
  if (window.waveFroth > 0.05) {
    ctx.strokeStyle = "rgba(199, 209, 217, " + window.waveFroth + ")";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}
