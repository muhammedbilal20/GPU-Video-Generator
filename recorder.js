// ===============================
// recorder.js
// Canvas Video Recorder
// ===============================

let mediaRecorder;
let recordedChunks = [];

const canvas = document.getElementById("videoCanvas");

function startRecording() {

    recordedChunks = [];

    const stream = canvas.captureStream(60);

    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
    });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = saveRecording;

    mediaRecorder.start();

    console.log("Recording started...");

}

function stopRecording() {

    if (mediaRecorder &&
        mediaRecorder.state !== "inactive") {

        mediaRecorder.stop();

        console.log("Recording stopped.");

    }

}

function saveRecording() {

    const blob = new Blob(recordedChunks, {
        type: "video/webm"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "GPU_Benchmark.webm";

    a.click();

    URL.revokeObjectURL(url);

}

const recordBtn = document.getElementById("recordBtn");

if (recordBtn) {

    recordBtn.addEventListener("click", () => {

        startRecording();

        setTimeout(() => {

            stopRecording();

        }, 10000); // Records for 10 seconds

    });

}
