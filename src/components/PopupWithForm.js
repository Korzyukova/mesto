import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorName, submitHandler) {
        super(selectorName);
        this.submitHandler = submitHandler;
        this.form = this.popup.querySelector('form');
        this._inputList = this.popup.querySelectorAll('input');
    }

    open() {
        super.open();
    }

    close() {
        super.close();
    }

    _getInputValues() {        
        this._formValues = {};
      
        this._inputList.forEach(input => {
           this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
      } 

    _setInputValues(values) {
        for(var item in values){
            this.popup.querySelector(`[name=${item}]`).value = values[item];
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this.popup.querySelector('form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitHandler(this._getInputValues());
            this.form.reset();
          });
    }
}