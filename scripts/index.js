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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardContainer = document.querySelector(".cards__list");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const popupButton = imagePopup.querySelector(".popup__close");

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardTempleteClon = cardTemplate.cloneNode(true);
  const cardImage = cardTempleteClon.querySelector(".card__image");
  const cardTitle = cardTempleteClon.querySelector(".card__title");
  const likeButton = cardTempleteClon.querySelector(".card__like-button");
  const deleteButton = cardTempleteClon.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", function () {
    cardTempleteClon.remove();
  });

  cardImage.addEventListener("click", function () {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openModal(imagePopup);
  });

  return cardTempleteClon;
}

popupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
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

addButton.addEventListener("click", function () {
  openModal(newCardPop);
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

const form = document.getElementById("edit-profile-form");
const profileNameInput = form.querySelector("#profile-name");
const profileDescriptionInput = form.querySelector("#profile-description");
const buttonProfile = form.querySelector(".popup__button");

function updateButton() {
  if (
    profileNameInput.checkValidity() &&
    profileDescriptionInput.checkValidity()
  ) {
    buttonProfile.disabled = false;
  } else {
    buttonProfile.disabled = true;
  }
}

profileNameInput.addEventListener("input", function () {
  if (!profileNameInput.validity.valid) {
    showInputError(profileNameInput);
  } else {
    hideInputError(profileNameInput);
  }
  updateButton();
});

profileDescriptionInput.addEventListener("input", function () {
  if (!profileDescriptionInput.validity.valid) {
    showInputError(profileDescriptionInput);
  } else {
    hideInputError(profileDescriptionInput);
  }
  updateButton();
});

function showInputError(inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

updateButton();
