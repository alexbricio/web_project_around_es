class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._isLiked = cardData.isLiked;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");

    const cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._deleteButton = this._element.querySelector(".card__delete-button");

    if (this._owner !== this._userId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener("click", () => this._handleDelete());
    }

    this._image = this._element.querySelector(".card__image");
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._image.addEventListener("click", () => this._handleImageClick());
  }

  _handleLike() {
    this._handleLikeClick(this._id, this._isLiked, this);
  }

  _handleDelete() {
    this._handleDeleteClick(this._id, this);
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  removeCard() {
    this._element.remove();
  }
}

export default Card;
