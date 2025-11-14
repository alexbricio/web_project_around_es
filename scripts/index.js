const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (item) {
  console.log(item);
});

const editar_perfil = document.querySelector(".profile__edit-button");
const modal_popup = document.querySelector("#edit-popup");
const cerrar = modal_popup.querySelector(".popup__close");
const nombre_perfil = document.querySelector(".profile__title");
const descripcion = document.querySelector(".profile__description");
const nombre_input = modal_popup.querySelector(".popup__input_type_name");
const descripcion_input = modal_popup.querySelector(
  ".popup__input_type_description"
);

function openModal(element) {
  element.classList.add("popup_is-opened");
}
function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

editar_perfil.addEventListener("click", function () {
  handleOpenEditModal();
});

cerrar.addEventListener("click", function () {
  closeModal(modal_popup);
});

function fillProfileForm() {
  nombre_input.value = nombre_perfil.textContent;
  descripcion_input.value = descripcion.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal_popup);
}

let formElement = modal_popup.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nombre_input.value;
  const newDescription = descripcion_input.value;
  nombre_perfil.textContent = newName;
  descripcion.textContent = newDescription;
  closeModal(modal_popup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
