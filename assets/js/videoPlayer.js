import axios from "axios";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsfullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRnage = document.getElementById("jsVolume");

const createAt = document.querySelectorAll("#jsCreateAt");

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

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = "<i class='fas fa-play'></i>";
}

function handleDrag(event) {
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

function formatDate2(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRnage.addEventListener("input", handleDrag);

  for (let i = 0; i < createAt.length; i++) {
    createAt[i].innerHTML = formatDate2(createAt[i].innerHTML);
  }
}

if (videoContainer) {
  init();
}
