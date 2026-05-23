class Card {
    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSeletctor).content.querySelector(".card");

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

        return this._element;
    }

}