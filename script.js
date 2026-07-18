// ===============================
// GPU Benchmark Video Generator
// Part 3A
// ===============================

const gpuList = document.getElementById("gpuList");
const addGPU = document.getElementById("addGPU");
const generate = document.getElementById("generate");

let gpuData = [];

// -------------------------------
// Add GPU Row
// -------------------------------

addGPU.addEventListener("click", () => {

    const row = document.createElement("div");

    row.className = "gpuRow";

    row.innerHTML = `

        <input
            class="gpuName"
            type="text"
            placeholder="GPU Name">

        <input
            class="gpuFPS"
            type="number"
            placeholder="FPS">

        <button
            class="deleteRow">
            ✖
        </button>

    `;

    gpuList.appendChild(row);

});

// -------------------------------
// Delete Row
// -------------------------------

gpuList.addEventListener("click",(e)=>{

    if(e.target.classList.contains("deleteRow")){

        e.target.parentElement.remove();

    }

});

// -------------------------------
// Read Inputs
// -------------------------------

function readGPUData(){

    gpuData = [];

    const names =
        document.querySelectorAll(".gpuName");

    const fps =
        document.querySelectorAll(".gpuFPS");

    for(let i=0;i<names.length;i++){

        const gpuName =
            names[i].value.trim();

        const gpuFPS =
            Number(fps[i].value);

        if(gpuName!=="" && gpuFPS>0){

            gpuData.push({

                name:gpuName,

                fps:gpuFPS

            });

        }

    }

}

// -------------------------------
// Sort GPUs
// -------------------------------

function sortGPUData(){

    gpuData.sort((a,b)=>{

        return b.fps-a.fps;

    });

}

// -------------------------------
// Generate Button
// -------------------------------

generate.addEventListener("click",()=>{

    readGPUData();

    sortGPUData();

    console.clear();

    console.table(gpuData);

    // Canvas drawing
    // will be added in Part 3B

});

// ===============================
// Part 3B
// Canvas Drawing
// ===============================

const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d");

function drawBenchmark(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Header
    const headerColor =
        document.getElementById("headerColor").value;

    ctx.fillStyle=headerColor;

    ctx.fillRect(0,0,1080,140);

    ctx.fillStyle="white";

    ctx.font="bold 60px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        document.getElementById("title").value,

        540,

        90

    );

    let y=200;

    ctx.textAlign="left";

    ctx.font="bold 44px Arial";

    gpuData.forEach((gpu)=>{

        // Row line

        ctx.strokeStyle="#DDDDDD";

        ctx.beginPath();

        ctx.moveTo(50,y+45);

        ctx.lineTo(1030,y+45);

        ctx.stroke();

        // Percentage

        ctx.fillStyle="#444";

        ctx.fillText(

            gpu.fps+"%",

            70,

            y

        );

        // GPU Name

        ctx.fillStyle="#111";

        ctx.fillText(

            gpu.name,

            250,

            y

        );

        y+=80;

    });

}

// ===============================
// Part 3C
// Animation + Generate Button
// ===============================

const generateBtn = document.getElementById("generateBtn");

if (generateBtn) {
    generateBtn.addEventListener("click", () => {

        // Get latest GPU data
        readGPUData();

        // Draw benchmark
        drawBenchmark();

        // Simple animation (fade in)
        let alpha = 0;

        function animate() {

            ctx.save();
            ctx.globalAlpha = alpha;

            drawBenchmark();

            ctx.restore();

            alpha += 0.05;

            if (alpha < 1) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    });
}
