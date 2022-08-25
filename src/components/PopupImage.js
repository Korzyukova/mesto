import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector)
    {
        super(selector);

        document.querySelector('#imagePopup').addEventListener('click', this.close.bind(this));
    }
}