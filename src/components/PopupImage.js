import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector)
    {
        super(selector);

        this._popupImage = this.popup.querySelector('.popup__image');
        this._imageName = this.popup.querySelector('.popup__image-name');
    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._imageName.textContent = name;
        super.open()
    }
}