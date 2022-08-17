import PopupImage from './PopupImage.js';
export default class Card {
    constructor(item, templateSelector) {

        this._item = item;
        this._templateSelector = templateSelector;

    }

    _createClickHandler(card) {
        this.handle = this._clickHandler.bind(this);
        card.querySelector('.photo-grid__item').addEventListener('click', this.handle);
    }

    _clickHandler(item) {
        const popupImage = document.querySelector('.popup__image');
        const imageName = document.querySelector('.popup__image-name');
        const imagePopup = document.querySelector('#imagePopup');
        popupImage.src = this._item.link;
        popupImage.alt = this._item.name;
        imageName.textContent = this._item.name;

        const popUp = new PopupImage('#imagePopup');

        popUp.open();
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__rectangle');
        let card = cardTemplate.cloneNode(true);

        let photoGridItem = card.querySelector('.photo-grid__item');
        //this.openPopup = openPopupFunction;

        photoGridItem.src = this._item.link;
        photoGridItem.alt = this._item.name;
        card.querySelector('.photo-grid__name').textContent = this._item.name;

        this._createClickHandler(card);

        return card
    }

}
