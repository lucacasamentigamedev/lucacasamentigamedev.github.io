// === GLOBAL STATE ===
let initialX, initialY;
let isDragging = false;
let offsetX, offsetY;
let velocity = { x: 0, y: 0 };
let lastMouseX, lastMouseY;
let lastTime;
let animationFrame;

const img = document.querySelector("#bouncing-img");

// === INITIAL POSITIONING ON LOAD ===
// Positions the bouncing image to match the original hidden image
window.addEventListener("load", () => {
    const reference = document.querySelector("#original-img");
    const rect = reference.getBoundingClientRect();

    img.style.position = "absolute";
    img.style.left = rect.left + "px";
    img.style.top = rect.top + "px";
    img.style.width = rect.width + "px";
    img.style.height = rect.height + "px";

    // Save initial position for return animation
    initialX = rect.left;
    initialY = rect.top;
});

// === HANDLE RESIZE ===
// Recalculates the position of the bouncing image when window is resized
function repositionFloatingImage() {
    const reference = document.querySelector("#original-img");
    const wrapper = document.querySelector(".floating-img-wrapper");

    if (!reference || !wrapper) return;

    const referenceRect = reference.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const left = referenceRect.left - wrapperRect.left;
    const top = referenceRect.top - wrapperRect.top;

    img.style.left = left + "px";
    img.style.top = top + "px";
    img.style.width = referenceRect.width + "px";
    img.style.height = referenceRect.height + "px";

    initialX = left;
    initialY = top;
}

// === Esegui una volta al DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", repositionFloatingImage);

// === Esegui su resize ===
window.addEventListener("resize", repositionFloatingImage);

// === Esegui su scroll ===
window.addEventListener("scroll", repositionFloatingImage);


// === DRAG START ===
img.addEventListener("mousedown", (e) => {
    isDragging = true;

    const rect = img.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    lastTime = performance.now();

    img.style.cursor = "grabbing";
    cancelAnimationFrame(animationFrame);
});

// === DRAG MOVE ===
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const now = performance.now();
    const dt = Math.max((now - lastTime) / 1000, 0.016); // avoid too small values

    const sensitivity = 0.5;
    velocity.x = ((e.clientX - lastMouseX) / dt) * sensitivity;
    velocity.y = ((e.clientY - lastMouseY) / dt) * sensitivity;

    const maxSpeed = 1500;
    velocity.x = Math.max(Math.min(velocity.x, maxSpeed), -maxSpeed);
    velocity.y = Math.max(Math.min(velocity.y, maxSpeed), -maxSpeed);

    const minSpeed = 30;
    if (Math.abs(velocity.x) < minSpeed) velocity.x = 0;
    if (Math.abs(velocity.y) < minSpeed) velocity.y = 0;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    lastTime = now;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    img.style.left = x + "px";
    img.style.top = y + "px";
});

// === DRAG END ===
document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    img.style.cursor = "grab";
    img.src = "resources/hero/me_scared.png"; // change to scared face
    bounce();
});

// === BOUNCE ANIMATION ===
// Simulates physics-based bounce and friction within screen boundaries
function bounce() {
    const friction = 0.96;
    const bounceFactor = -0.8;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    function animate() {
        const rect = img.getBoundingClientRect();
        let x = rect.left + velocity.x;
        let y = rect.top + velocity.y;

        const imgWidth = rect.width;
        const imgHeight = rect.height;

        // Horizontal bounds
        if (x < 0) {
            x = 0;
            velocity.x *= bounceFactor;
        } else if (x + imgWidth > screenWidth) {
            x = screenWidth - imgWidth;
            velocity.x *= bounceFactor;
        }

        // Vertical bounds
        if (y < 0) {
            y = 0;
            velocity.y *= bounceFactor;
        } else if (y + imgHeight > screenHeight) {
            y = screenHeight - imgHeight;
            velocity.y *= bounceFactor;
        }

        img.style.left = x + "px";
        img.style.top = y + "px";

        velocity.x *= friction;
        velocity.y *= friction;

        if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            returnToStart(); // go back to initial position when stopped
        }
    }

    animate();
}

// === RETURN TO ORIGINAL POSITION ===
// Smoothly returns the image to its original location
function returnToStart() {
    img.src = "resources/hero/me.png";
    const duration = 300; // in ms
    const startX = parseFloat(img.style.left);
    const startY = parseFloat(img.style.top);
    const deltaX = initialX - startX;
    const deltaY = initialY - startY;

    const startTime = performance.now();

    function animateReturn(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const ease = t * (2 - t); // ease-out

        img.style.left = startX + deltaX * ease + "px";
        img.style.top = startY + deltaY * ease + "px";

        if (t < 1) {
            requestAnimationFrame(animateReturn);
        }
    }

    requestAnimationFrame(animateReturn);
}
