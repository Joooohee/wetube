import axios from "axios";

const replyButton = document.querySelectorAll(".jsReplyButton");
const addReplyForm = document.querySelectorAll(".jsAddReply");

const sendReply = async (commentId, reply) => {
  const videoId = window.location.href.split("/videos/")[1];
  const request = await axios({
    url: `/api/${videoId}/reply`,
    method: "POST",
    data: {
      commentId,
      reply,
    },
  });

  if (request.status === "200") {
    // addComment(avatarUrl, comment, name, id);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  const replyInput = event.target.querySelector("input");
  const reply = replyInput.value;
  const commentId = event.target.closest("li").id;
  sendReply(commentId, reply);
  replyInput.value = "";
}

export function showReply(event) {
  const button = event.target;
  const repleBlock = button.closest(".bottom__atc").nextSibling;
  if (repleBlock.classList.value.indexOf("display-none") > 0) {
    repleBlock.classList.remove("display-none");
    button.innerHTML = "닫기";
  } else {
    repleBlock.classList.add("display-none");
    button.innerHTML = "답글";
  }
}

function init() {
  for (let i = 0; i < replyButton.length; i++) {
    replyButton[i].addEventListener("click", showReply);
  }

  for (let i = 0; i < addReplyForm.length; i++) {
    addReplyForm[i].addEventListener("submit", handleSubmit);
  }
}

if (replyButton) {
  init();
}
