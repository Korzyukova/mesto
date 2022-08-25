import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorName, submitHandler) {
        {
            document.querySelector(selectorName).querySelector('form').addEventListener('submit', submitHandler);
            
            super(selectorName);
            this.selectorName = selectorName;
        };
    }
    open()
    {
        super.open();
    }
    close()
    {
        super.close();
        const values = this._getInputValues();
        values[0].value='';
        values[1].value='';
    }

    _getInputValues()
    {
        return document.querySelector(this.selectorName).querySelectorAll('input');
    }

    _setInputValues(values)
    {
        var inputs = this._getInputValues();
        inputs[0].value = values[0];
        inputs[1].value = values[1];
    }
}