const loggedUser = document.getElementById("jsLoggedUser");
const input = document.querySelectorAll("input");
const modal = document.getElementById("jsModal");
const modalBackground = document.querySelector(".modal__background");
const likeButton = document.querySelectorAll(".jsLike");

function showModal() {
  if (!loggedUser?.innerHTML) {
    modal.classList.remove("display-none");
  }
}

function handelClick() {
  modal.classList.add("display-none");
}

function init() {
  modalBackground.addEventListener("click", handelClick);
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("focus", showModal);
  }
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", showModal);
  }
}

if (loggedUser) {
  init();
}
