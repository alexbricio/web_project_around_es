import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const imagePopup = new PopupWithImage("#image-popup");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  profilePopup.renderLoading(true);
  api
    .editProfile(formData.name, formData.description)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
        id: userData._id,
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});

profilePopup.setEventListeners();

const editProfileForm = document.querySelector("#edit-profile-form");
const nombreInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);

function createCard(cardData) {
  const card = new Card(
    cardData,
    userInfo.getUserId(),
    "#card-template",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
      id: userData._id,
    });
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  newCardPopup.renderLoading(true);
  api
    .addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});

const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .editAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
        id: userData._id,
      });
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

avatarPopup.setEventListeners();

const profileImage = document.querySelector(".profile__avatar-button");
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

newCardPopup.setEventListeners();

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  nombreInput.value = userData.name;
  descriptionInput.value = userData.description;
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

const avatarForm = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.setEventListeners();
profileImage.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

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

function handleLikeClick(cardId, isLiked, card) {
  api
    .changeLikeCardStatus(cardId, isLiked)
    .then((updatedCard) => {
      card.setLikeStatus(updatedCard.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteClick(cardId, card) {
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  deleteCardPopup.open();
}
