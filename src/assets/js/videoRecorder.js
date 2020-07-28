const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPriview = document.getElementById("jsVideoPreview");

let streamObject;
let vidieoRecorder;

const handleVideoDate = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPriview.srcObject = stream;
    videoPriview.muted = true;
    videoPriview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const stopRecording = () => {
  vidieoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
  vidieoRecorder = new MediaRecorder(streamObject);
  vidieoRecorder.start();
  vidieoRecorder.addEventListener("dataavailable", handleVideoDate);
  recordBtn.addEventListener("click", stopRecording);
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
