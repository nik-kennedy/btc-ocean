// BTC Ocean — Swell Engine (Version 1)
// Controls the deep macro swell (EMA 200 influence)

const SwellEngine = {
  strength: 0.0,   // how tall the swell is
  slope: 0.0,      // rising or falling
  cycle: 0.0,      // halving / macro cycle phase

  // Apply incoming macro data (EMA 200, cycle phase)
  applyData(data) {
    // EMA 200 slope → swell direction
    if (data.ema200Slope !== undefined) {
      this.slope = data.ema200Slope * 0.01;
    }

    // EMA 200 distance → swell height
    if (data.ema200Distance !== undefined) {
      this.strength = Math.min(40, data.ema200Distance * 0.2);
    }

    // Macro cycle → horizon tension
    if (data.cyclePhase !== undefined) {
      this.cycle = data.cyclePhase * 0.01;
    }
  },

  // Draw the swell band behind the waves
  draw(ctx, canvas) {
    const oceanTop = canvas.height * 0.6;

    const swellHeight = oceanTop + 40 + this.strength;
    const swellColor = "rgba(75, 179, 255, 0.15)"; // faint lightning blue

    ctx.beginPath();
    ctx.moveTo(0, swellHeight);

    for (let x = 0; x < canvas.width; x++) {
      const y =
        swellHeight +
        Math.sin((x + this.cycle * 200) / 300) * (10 + this.strength * 0.2);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();

    ctx.fillStyle = swellColor;
    ctx.fill();
  }
};

// Export
window.SwellEngine = SwellEngine;
