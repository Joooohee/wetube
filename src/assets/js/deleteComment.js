import axios from "axios";

const deleteComment = document.querySelectorAll(".jsDeleteComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const removeComment = (commentId) => {
  const comment = document.getElementById(commentId);
  commentList.removeChild(comment);
  decreaseNumber();
};

const sendComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  })
    .then(() => {
      removeComment(commentId);
    })
    .catch((err) => console.log(err));
};

// eslint-disable-next-line import/prefer-default-export
export function handelDltClick(event) {
  event.preventDefault();
  const commentId = event.target.closest("li").id;
  sendComment(commentId);
}

function init() {
  for (let i = 0; i < deleteComment.length; i++) {
    deleteComment[i].addEventListener("click", handelDltClick);
  }
}

if (deleteComment) {
  init();
}
