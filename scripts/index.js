import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const imagePopup = new PopupWithImage("#image-popup");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.description,
  });
  profilePopup.close();
});

profilePopup.setEventListeners();

const editProfileForm = document.querySelector("#edit-profile-form");
const nombre_input = editProfileForm.querySelector(".popup__input_type_name");
const descripcion_input = editProfileForm.querySelector(
  ".popup__input_type_description",
);

function createCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    "#card-template",
    handleCardClick,
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardSection.renderItems();

const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const cardElement = createCard({
    name: formData["place-name"],
    link: formData.link,
  });
  cardSection.addItem(cardElement);
  newCardPopup.close();
});

newCardPopup.setEventListeners();

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  nombre_input.value = userData.name;
  descripcion_input.value = userData.description;
}

function handleOpenEditModal() {
  fillProfileForm();
  profileFormValidator.resetValidation();
  profilePopup.open();
}

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", handleOpenEditModal);

const addButton = document.querySelector(".profile__add-button");

const newCardForm = document.getElementById("new-card-form");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleOpenNewCardModal() {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
}

addButton.addEventListener("click", handleOpenNewCardModal);

const profileFormValidator = new FormValidator(
  validationConfig,
  editProfileForm,
);
profileFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}
