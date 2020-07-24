import axios from "axios";
import { commonFormatDate } from "./commonFN";
import { handelDltClick } from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (avatarUrl, comment, name, id) => {
  const li = document.createElement("li");
  const imgAvatar = document.createElement("img");
  const divContent = document.createElement("div");
  const divInfo = document.createElement("div");
  const divText = document.createElement("div");
  const divReply = document.createElement("div");
  const spanName = document.createElement("span");
  const spanCreateAt = document.createElement("span");
  const spanText = document.createElement("span");
  const spanIcon = document.createElement("span");
  const spanTextReply = document.createElement("span");
  const spanTextDelete = document.createElement("span");

  imgAvatar.src = `http://localhost:4000/${avatarUrl}`;
  imgAvatar.className = "comment-avatar";

  spanName.innerHTML = `${name}&nbsp;&nbsp;`;
  spanCreateAt.innerHTML = commonFormatDate(new Date());
  spanCreateAt.className = "jsCreateAt";

  spanText.innerHTML = comment;
  spanIcon.innerHTML = "<i class='fas fa-heart'></>";
  spanTextReply.innerHTML = "답글";
  spanTextDelete.innerHTML = "삭제";
  spanTextDelete.className = "jsDeleteComment";
  spanTextDelete.addEventListener("click", handelDltClick);

  divInfo.className = "commnets-list__info";
  divInfo.appendChild(spanName);
  divInfo.appendChild(spanCreateAt);

  divText.className = "commnets-list__text";
  divText.appendChild(spanText);

  divReply.className = "commnets-list__reply";
  divReply.appendChild(spanIcon);
  divReply.appendChild(spanTextReply);
  divReply.appendChild(spanTextDelete);

  divContent.className = "comment-list__content";
  divContent.appendChild(divInfo);
  divContent.appendChild(divText);
  divContent.appendChild(divReply);

  li.appendChild(imgAvatar);
  li.appendChild(divContent);
  li.id = id;

  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  })
    .then((req) => {
      const {
        data: {
          resultData: { avatarUrl, name, id },
        },
      } = req;
      addComment(avatarUrl, comment, name, id);
    })
    .catch((err) => console.log(err));
};

function handleSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
