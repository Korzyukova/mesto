import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorName, submitHandler) {
        super(selectorName);
        this.submitHandler = submitHandler;
        this.form = this.popup.querySelector('form');
        this._inputList = this.popup.querySelectorAll('input');
        this.submitButton = this.popup.querySelector('button[type=submit]');
        this._submitBtnText = this.submitButton.textContent

    }

    close() {
        super.close();
        this.form.reset();
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
        if (isLoading) {
          this.submitButton.textContent = loadingText;
        } else {
          this.submitButton.textContent = this._submitBtnText;
        }
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
//свойство form не доступно в методе setEventListener, этот метод вызывается из родительского конструктора
        this.popup.querySelector('form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitHandler(this._getInputValues());
          });
    }
}