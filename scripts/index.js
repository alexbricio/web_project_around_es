import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const cardContainer = document.querySelector(".cards__list");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupButton = imagePopup.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");
const editar_perfil = document.querySelector(".profile__edit-button");
const modal_popup = document.querySelector("#edit-popup");
const cerrar = modal_popup.querySelector(".popup__close");
const nombre_perfil = document.querySelector(".profile__title");
const descripcion = document.querySelector(".profile__description");
const nombre_input = modal_popup.querySelector(".popup__input_type_name");
const descripcion_input = modal_popup.querySelector(
  ".popup__input_type_description",
);

popupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function renderCard(name, link, container) {
  const card = new Card(name, link, "#card-template", handleCardClick);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});

function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nombre_input.value = nombre_perfil.textContent;
  descripcion_input.value = descripcion.textContent;
}

function handleOpenEditModal() {
  updateButton();
  fillProfileForm();
  openModal(modal_popup);
}

editar_perfil.addEventListener("click", function () {
  handleOpenEditModal();
});

cerrar.addEventListener("click", function () {
  closeModal(modal_popup);
});

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

const addButton = document.querySelector(".profile__add-button");
const newCardPop = document.querySelector("#new-card-popup");
const closeNewCard = newCardPop.querySelector(".popup__close");
const popupForm = document.querySelector("#new-card-form");
const inputName = popupForm.querySelector(".popup__input_type_card-name");
const inputUrl = popupForm.querySelector(".popup__input_type_url");

const newCardForm = document.getElementById("new-card-form");
const placeNameInput = newCardForm.querySelector("#place-name");
const placeUrlInput = newCardForm.querySelector("#place-url");
const newCardButton = newCardForm.querySelector(".popup__button");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleOpenNewCardModal() {
  hideInputError(newCardForm, placeNameInput);
  hideInputError(newCardForm, placeUrlInput);
  updateNewCardButton();
  openModal(newCardPop);
}

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(popup);
    }
  });
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

closeNewCard.addEventListener("click", function () {
  closeModal(newCardPop);
});

popupForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = inputName.value;
  const urlValue = inputUrl.value;

  renderCard(nameValue, urlValue, cardContainer);

  popupForm.reset();

  closeModal(newCardPop);
}

const editform = document.getElementById("edit-profile-form");
const profileNameInput = editform.querySelector("#profile-name");
const profileDescriptionInput = editform.querySelector("#profile-description");
const buttonProfile = editform.querySelector(".popup__button");
const profileFormValidator = new FormValidator(validationConfig, editform);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.enableValidation();

function handleCardClick(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(imagePopup);
}
