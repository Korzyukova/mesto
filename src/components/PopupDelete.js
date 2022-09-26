import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor(selectorName, submitHandler) {
        super(selectorName);
        this.submitHandler = submitHandler;
        this.form = this.popup.querySelector('form');
    }

    open(card) {
        this.card = card;
        
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        

        this.popup.querySelector('form').addEventListener('submit', this._submitHandler.bind(this));
    }

    _submitHandler(evt)
    {
        evt.preventDefault();
            this.submitHandler(this.card);

    }
}