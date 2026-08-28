let waveOffset = 0;

// Core colors (stylized ocean palette)
const COLORS = {
  deep: "#003f5c",       // deep liquidity
  mid: "#2f4b7c",        // mid-depth
  shallow: "#665191",    // shallow liquidity
  sand: "#f6d6a8",       // accumulation zone
  foam: "#ffffff",       // volatility crest
  skyTop: "#87CEEB",     // sentiment sky
  skyBottom: "#B0E0E6"   // horizon blend
};

function drawSky(ctx, width, height) {
  const sky = ctx.createLinearGradient(0, 0, 0, height * 0.4);
  sky.addColorStop(0, COLORS.skyTop);
  sky.addColorStop(1, COLORS.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height * 0.4);
}

function drawSand(ctx, width, height) {
  ctx.fillStyle = COLORS.sand;
  ctx.fillRect(0, height * 0.85, width, height * 0.15);
}

function drawOcean(ctx, width, height) {
  const oceanHeight = height * 0.85;

  // Depth gradient
  const oceanGrad = ctx.createLinearGradient(0, height * 0.4, 0, oceanHeight);
  oceanGrad.addColorStop(0, COLORS.deep);
  oceanGrad.addColorStop(0.5, COLORS.mid);
  oceanGrad.addColorStop(1, COLORS.shallow);

  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, height * 0.4, width, oceanHeight - height * 0.4);

  // Stylized swell bands
  for (let i = 0; i < 5; i++) {
    const y = height * 0.4 + i * 40 + Math.sin(waveOffset + i) * 10;
    ctx.strokeStyle = COLORS.mid;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Foam line (volatility crest)
  const foamY = height * 0.75 + Math.sin(waveOffset * 1.5) * 8;
  ctx.strokeStyle = COLORS.foam;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, foamY);
  ctx.lineTo(width, foamY);
  ctx.stroke();
}

function animate() {
  const canvas = document.getElementById("oceanCanvas");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  drawSky(ctx, width, height);
  drawOcean(ctx, width, height);
  drawSand(ctx, width, height);

  waveOffset += 0.02;

  requestAnimationFrame(animate);
}

animate();
