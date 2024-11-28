const drawingCanvas = document.getElementById('drawingCanvas');
const drawingCtx = drawingCanvas.getContext('2d');
let lastX = null;
let lastY = null;
const brushSize = 6; 
const fadeSpeed = 0.27; 
let cursorColor = 'black'; 



// TAMAÑO DEL CANVAS
function resizeCanvas() {
    drawingCanvas.width = window.innerWidth;
    drawingCanvas.height = window.innerHeight;
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


// COLOR DEL CURSOR
window.setCursorColor = (newColor) => {
    cursorColor = newColor;
};

// CURSOR

function drawCursor(e) {
    const rect = drawingCanvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    if (lastX === null || lastY === null) {
        lastX = currentX;
        lastY = currentY;
    }

    // CALCULA LA DISTANCIA, PUNTOS INTERMEDIOS
    const distance = Math.hypot(currentX - lastX, currentY - lastY);
    const steps = Math.ceil(distance / (brushSize / 2));

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const interX = lastX + (currentX - lastX) * t;
        const interY = lastY + (currentY - lastY) * t;

        drawingCtx.beginPath();
        drawingCtx.arc(interX, interY, brushSize, 0, Math.PI * 2);
        drawingCtx.fillStyle = cursorColor;
        drawingCtx.fill();
    }

    lastX = currentX;
    lastY = currentY;
}

// DIBUJA EL PUNTO FIJO EN LA ÚLTIMA POSICIÓN 
function drawStaticCursor() {
    if (lastX !== null && lastY !== null) {
        drawingCtx.beginPath();
        drawingCtx.arc(lastX, lastY, brushSize, 0, Math.PI * 2);
        drawingCtx.fillStyle = cursorColor;
        drawingCtx.fill();
    }
    requestAnimationFrame(drawStaticCursor);
}

// FUNCIÓN PARA DESVANECER EL RASTRO
function fadeCanvas() {
    drawingCtx.globalCompositeOperation = 'destination-out';
    drawingCtx.fillStyle = `rgba(255, 255, 255, ${fadeSpeed})`; // Aumentamos el alfa para borrar completamente
    drawingCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    drawingCtx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(fadeCanvas);
}

document.addEventListener('mousemove', drawCursor);
document.addEventListener('mouseleave', () => {
    lastX = null;
    lastY = null;
});

fadeCanvas();
drawStaticCursor();
