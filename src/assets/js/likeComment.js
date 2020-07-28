import axios from "axios";

const likeButton = document.querySelectorAll(".jsLike");

function onLike(commentId, likeCheck) {
  console.log(commentId, likeCheck);
  const comment = document.getElementById(commentId);
  console.log(comment);
  if (likeCheck === "Y") {
    comment.querySelector(".jsLike").innerHTML = "<i class='fas fa-heart'></i>";
  } else {
    comment.querySelector(".jsLike").innerHTML = "<i class='far fa-heart'></i>";
  }
}

const sendLike = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/like`,
    method: "POST",
    data: {
      commentId,
    },
  })
    .then((req) => {
      const {
        data: {
          resultData: { likeCheck },
        },
      } = req;
      onLike(commentId, likeCheck);
    })
    .catch((err) => console.log(err));
};

function handleClick(event) {
  event.preventDefault();
  const commentId = event.target.closest("li").id;
  sendLike(commentId);
}

function init() {
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", handleClick);
  }
}

if (likeButton) {
  init();
}
