// BTC Ocean — Camera System (Version 1)
// Handles camera mode switching (shoreline, cliff, drone, underwater, cosmic)

let cameraMode = "shoreline";

// Attach camera menu interactions
const cameraMenu = document.getElementById("camera-menu");
cameraMenu.addEventListener("click", (e) => {
  if (e.target.dataset.camera) {
    cameraMode = e.target.dataset.camera;
    smoothCameraTransition(cameraMode);
  }
});

// Placeholder camera transition system
// (We will replace this with real motion curves later)
function smoothCameraTransition(mode) {
  console.log("Camera changed to:", mode);

  // For now, camera mode only changes wave + sky behavior slightly
  switch (mode) {
    case "shoreline":
      waveOffset = waveOffset; // unchanged
      break;

    case "cliff":
      waveOffset += 0.005; // slightly faster waves
      break;

    case "drone":
      waveOffset += 0.01; // faster waves
      break;

    case "underwater":
      waveOffset -= 0.005; // slower waves
      break;

    case "cosmic":
      skyMood = 1; // brighter sky
      break;
  }
}
