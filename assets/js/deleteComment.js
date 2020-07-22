import axios from "axios";

const deleteComment = document.querySelectorAll(".jsDeleteComment");
const commentList = document.getElementById("jsCommentList");

const addComment = (commentId) => {
  const removeComment = document.getElementById(commentId);
  commentList.removeChild(removeComment);
};

const removeComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  })
    .then((req) => {
      addComment(commentId);
    })
    .catch((err) => console.log(err));
};

function handelClick(event) {
  event.preventDefault();
  const commentId = event.target.closest("li").id;
  removeComment(commentId);
}

function init() {
  for (let i = 0; i < deleteComment.length; i++) {
    deleteComment[i].addEventListener("click", handelClick);
  }
}

init();
