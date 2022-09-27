import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorName, submitHandler) {
        super(selectorName);
        this.submitHandler = submitHandler;
        this.form = this.popup.querySelector('form');
        this._inputList = this.popup.querySelectorAll('input');
    }

    close() {
        super.close();
        this.form.reset();
    }

    _getInputValues() {        
        this._formValues = {};
      
        this._inputList.forEach(input => {
           this._formValues[input.name] = input.value;
        });
        
        return this._formValues;
      } 

    setInputValues(values) {
        for(const item in values){
            this.popup.querySelector(`[name=${item}]`).value = values[item];
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this.popup.querySelector('form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitHandler(this._getInputValues());
          });
    }
}