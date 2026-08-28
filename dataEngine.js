// BTC Ocean — Data Engine (Version 1)
// Simulates BTC data and feeds it into the ocean engines.
// Later this will connect to WEEX, Binance, CoinGlass, Fear & Greed, EMAs, ATR.

const DataEngine = {
  // Simulated BTC data (placeholder)
  data: {
    price: 79800,
    volatility: 0.2,       // ATR-like
    momentum: 0.1,         // short-term trend
    macroTrend: 0.3,       // EMA 200 direction
    liquidations: 20,      // liquidation cluster intensity
    fearGreed: 40,         // 0–100
    volumeMood: 0.2,       // low volume
    macroSentiment: 0.3,   // horizon glow
    ema200Slope: 0.1,
    ema200Distance: 50,
    cyclePhase: 0.5
  },

  // Update simulated data (for now)
  tick() {
    // Gentle oscillation to simulate real movement
    this.data.price += Math.sin(Date.now() / 2000) * 5;
    this.data.volatility = 0.2 + Math.sin(Date.now() / 3000) * 0.1;
    this.data.momentum = 0.1 + Math.sin(Date.now() / 2500) * 0.05;
    this.data.macroTrend = 0.3 + Math.sin(Date.now() / 8000) * 0.1;
    this.data.liquidations = 20 + Math.sin(Date.now() / 1500) * 10;
    this.data.fearGreed = 40 + Math.sin(Date.now() / 6000) * 20;
    this.data.volumeMood = 0.2 + Math.sin(Date.now() / 5000) * 0.1;
    this.data.macroSentiment = 0.3 + Math.sin(Date.now() / 7000) * 0.1;
    this.data.ema200Slope = 0.1 + Math.sin(Date.now() / 9000) * 0.05;
    this.data.ema200Distance = 50 + Math.sin(Date.now() / 4000) * 20;
    this.data.cyclePhase = 0.5 + Math.sin(Date.now() / 10000) * 0.2;

    this.applyToEngines();
  },

  // Feed data into all engines
  applyToEngines() {
    WavePhysics.applyData(this.data);
    WavePhysics.applyToOcean();

    SkyEngine.applyData(this.data);

    SwellEngine.applyData(this.data);
  }
};

// Start simulated data loop
setInterval(() => {
  DataEngine.tick();
}, 1000);

// Export
window.DataEngine = DataEngine;
