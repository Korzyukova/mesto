import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector)
    {
        super(selector);
    }

    open(link, name) {
        const popupImage = document.querySelector('.popup__image');
        const imageName = document.querySelector('.popup__image-name');
        const imagePopup = document.querySelector('#imagePopup');
        popupImage.src = link;
        popupImage.alt = name;
        imageName.textContent = name;
        super.open()
    }
}