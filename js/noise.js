const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Generar ruido
function generateNoise() {
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.createImageData(width, height);
  const buffer32 = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer32.length; i++) {
    buffer32[i] = (Math.random() * 255) << 24;
  }

  ctx.putImageData(imageData, 0, 0);
}

function animateNoise() {
  generateNoise();
  requestAnimationFrame(animateNoise);
}

function init() {
  resizeCanvas();
  animateNoise();
}

window.addEventListener('resize', resizeCanvas);
init();
