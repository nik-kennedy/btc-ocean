// BTC Ocean — Sky Engine (Version 1)
// Controls sky mood based on Fear & Greed + volume sentiment.
// Later this will connect to CoinGlass data.

const SkyEngine = {
  mood: 0.4,        // 0 = fear (dark storm), 1 = greed (bright sky)
  turbulence: 0.0,  // volume-based sky movement
  horizonGlow: 0.3, // macro sentiment

  // Apply incoming BTC sentiment data
  applyData(data) {
    // Fear & Greed → sky brightness
    if (data.fearGreed !== undefined) {
      this.mood = data.fearGreed / 100; // convert 0–100 → 0–1
    }

    // Volume → turbulence
    if (data.volumeMood !== undefined) {
      this.turbulence = data.volumeMood * 0.01;
    }

    // Macro sentiment → horizon glow
    if (data.macroSentiment !== undefined) {
      this.horizonGlow = data.macroSentiment * 0.01;
    }
  },

  // Apply sky mood to the canvas
  applyToOcean(ctx, canvas) {
    const skyHeight = canvas.height * 0.6;

    // Base colors
    const darkGrey = "#2a2e33";
    const steelBlue = "#3c4f63";
    const lightningBlue = "#4fb3ff";

    // Mood blending
    const moodBlend = this.mood; // 0–1

    const gradient = ctx.createLinearGradient(0, 0, 0, skyHeight);

    // Dark storm → bright sky
    gradient.addColorStop(0, darkGrey);
    gradient.addColorStop(0.7, blendColor(steelBlue, lightningBlue, moodBlend));
    gradient.addColorStop(1, blendColor(lightningBlue, "#5cc8ff", this.horizonGlow));

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, skyHeight);
  }
};

// Simple color blender (hex → hex)
function blendColor(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Export
window.SkyEngine = SkyEngine;
