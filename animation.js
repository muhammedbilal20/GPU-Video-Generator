// ===============================
// animation.js
// Benchmark Animation
// ===============================

let animationProgress = 0;
let animationRunning = false;

function startAnimation() {

    animationProgress = 0;
    animationRunning = true;

    requestAnimationFrame(updateAnimation);

}

function updateAnimation() {

    if (!animationRunning) return;

    animationProgress += 0.02;

    if (animationProgress > 1) {
        animationProgress = 1;
        animationRunning = false;
    }

    drawBenchmarkAnimated(animationProgress);

    if (animationRunning) {
        requestAnimationFrame(updateAnimation);
    }

}

function drawBenchmarkAnimated(progress) {

    if (typeof drawBenchmark === "function") {

        ctx.save();

        ctx.globalAlpha = progress;

        drawBenchmark();

        ctx.restore();

    }

}
