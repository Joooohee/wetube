import axios from "axios";
import { commonFormatDate } from "./commonFN";
import { handelDltReplyClick } from "./deleteReply";

const replyButton = document.querySelectorAll(".jsReplyButton");
const addReplyForm = document.querySelectorAll(".jsAddReply");

function addReply(reply, name, id, commentId) {
  const replyList = document
    .getElementById(commentId)
    .querySelector(".bottom__reply-text");
  const li = document.createElement("li");
  const spanText = document.createElement("span");
  const divReply = document.createElement("div");
  const spanName = document.createElement("span");
  const spanCreateAt = document.createElement("span");
  const spanDelete = document.createElement("span");

  spanText.innerHTML = reply;

  spanName.innerHTML = name;
  spanCreateAt.innerHTML = commonFormatDate(new Date());
  spanCreateAt.className = "jsReplyCreateAt";
  spanDelete.innerHTML = "X";
  spanDelete.className = "jsDeleteReply";
  spanDelete.addEventListener("click", handelDltReplyClick);

  divReply.className = "reply__right";
  divReply.appendChild(spanName);
  divReply.appendChild(spanCreateAt);
  divReply.appendChild(spanDelete);

  li.appendChild(spanText);
  li.appendChild(divReply);
  li.id = id;

  replyList.prepend(li);
}

const sendReply = async (commentId, reply) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/reply`,
    method: "POST",
    data: {
      commentId,
      reply,
    },
  })
    .then((req) => {
      const {
        data: {
          resultData: { name, id },
        },
      } = req;
      addReply(reply, name, id, commentId);
    })
    .catch((err) => console.log(err));
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
