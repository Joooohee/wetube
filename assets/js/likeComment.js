import axios from "axios";

const likeButton = document.querySelectorAll(".jsLike");

const sendLike = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const request = await axios({
    url: `/api/${videoId}/like`,
    method: "POST",
    data: {
      commentId,
    },
  });

  if (request.status === "200") {
    // addComment(avatarUrl, comment, name, id);
  }
};

function handleClick(event) {
  event.preventDefault();
  //   console.log("test");
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
