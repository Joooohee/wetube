import getBlobDuration from "get-blob-duration";
import { commonFormatDate } from "./commonFN";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsfullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRnage = document.getElementById("jsVolume");
const sliderRange = document.getElementById("jsSlider");
const createAt = document.querySelectorAll(".jsCreateAt");
const replyCreateAt = document.querySelectorAll(".jsReplyCreateAt");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "post" });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = "<i class='fas fa-play'></i>";
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
    volumeRnage.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
    volumeRnage.value = 0;
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = "<i class='fas fa-expand'></i>";
  fullScrnBtn.addEventListener("click", goFullScreen);

  // 브라우저별 함수 체크
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancleFullscreen) {
    document.mozCancleFullscreen(); // 파이어폭스
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); // 크롬
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen(); // 익스플로어
  }
}

function goFullScreen() {
  // 브라우저별 함수 체크
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen(); // 파이어폭스
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen(); // 크롬
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen(); // 익스플로어
  }

  fullScrnBtn.innerHTML = "<i class='fas fa-compress'></i>";
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

function formatDate(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function getSliderValue() {
  sliderRange.value = videoPlayer.currentTime.toFixed(1);
}

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then((response) => response.blob());
  const duration = await getBlobDuration(blob);
  console.log(duration);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  sliderRange.max = Math.floor(duration);
  setInterval(getCurrentTime, 1000);
  setInterval(getSliderValue, 100);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = "<i class='fas fa-play'></i>";
}

function handleVolumDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = "<i class='fas fa-volume-down'></i>";
  } else {
    volumeBtn.innerHTML = "<i class='fas fa-volume-off'></i>";
  }
}

function handleSliderDrag(event) {
  const {
    target: { value },
  } = event;
  console.log(value);
  videoPlayer.currentTime = value;
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function init() {
  videoPlayer.volume = 0.5;

  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRnage.addEventListener("input", handleVolumDrag);
  sliderRange.addEventListener("input", handleSliderDrag);

  for (let i = 0; i < createAt.length; i++) {
    createAt[i].innerHTML = commonFormatDate(createAt[i].innerHTML);
  }
  for (let i = 0; i < replyCreateAt.length; i++) {
    replyCreateAt[i].innerHTML = commonFormatDate(replyCreateAt[i].innerHTML);
  }
}

if (videoContainer) {
  init();
}
