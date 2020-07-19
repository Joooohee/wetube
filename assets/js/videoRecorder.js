const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPriview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPriview.srcObject = stream;
    videoPriview.muted = true;
    videoPriview.play();
  } catch (error) {
    recordBtn.innerHTML = "Can't record";
    recordBtn.removeEventListener(startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
