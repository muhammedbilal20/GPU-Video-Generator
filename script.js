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
