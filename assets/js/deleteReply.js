import axios from "axios";

const deleteReply = document.querySelectorAll(".jsDeleteReply");

function removeReply(replyId, commentId) {
  const reply = document.getElementById(replyId);
  const replyList = document
    .getElementById(commentId)
    .querySelector(".bottom__reply-text");
  replyList.removeChild(reply);
}

const sendReply = async (replyId, commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/reply/delete`,
    method: "POST",
    data: {
      replyId,
    },
  })
    .then(() => {
      removeReply(replyId, commentId);
    })
    .catch((err) => console.log(err));
};

// eslint-disable-next-line import/prefer-default-export
export function handelDltReplyClick(event) {
  event.preventDefault();
  const replyId = event.target.closest("li").id;
  const commentId = event.target.closest(".jsComment").id;
  sendReply(replyId, commentId);
}

function init() {
  for (let i = 0; i < deleteReply.length; i++) {
    deleteReply[i].addEventListener("click", handelDltReplyClick);
  }
}

if (deleteReply) {
  init();
}
