// BTC Ocean — Wave Physics (Version 1)
// This file defines how BTC data influences wave behavior.
// Later we will connect real data from WEEX, Binance, CoinGlass.

const WavePhysics = {
  // Core wave parameters (default calm shoreline)
  height: 20,        // wave height
  length: 180,       // wave wavelength
  speed: 0.015,      // wave animation speed
  volatility: 0.0,   // ATR-based froth intensity
  macroSwell: 0.0,   // EMA 200 influence

  // Update wave physics based on incoming BTC data
  applyData(data) {
    // Placeholder logic — will be replaced with real BTC data mapping

    // Price volatility → wave height
    if (data.volatility) {
      this.height = 20 + data.volatility * 2;
    }

    // Momentum → wave speed
    if (data.momentum) {
      this.speed = 0.015 + data.momentum * 0.002;
    }

    // Macro trend → swell
    if (data.macroTrend) {
      this.macroSwell = data.macroTrend * 10;
    }

    // Liquidation clusters → froth
    if (data.liquidations) {
      this.volatility = Math.min(1, data.liquidations / 100);
    }
  },

  // Apply physics to the ocean engine
  applyToOcean() {
    // Modify global waveOffset speed
    waveOffset += this.speed;

    // Modify wave height
    // (ocean.js uses waveHeight = 20; we override it here)
    window.waveHeight = this.height;

    // Add froth (volatility)
    window.waveFroth = this.volatility;

    // Add macro swell
    window.macroSwell = this.macroSwell;
  }
};

// Export for other scripts
window.WavePhysics = WavePhysics;
