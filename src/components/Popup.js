export default class Popup {
    constructor(selector) {
        this.popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    _handleClose(e) {
        this.close();
    }

    _handleCloseOverlay(e) {
        if (e.target === this.popup)
        {
            this.close();
        }
        
        e.stopPropagation();
    }

    setEventListeners() {
        this.popup.querySelector('.popup__closed').addEventListener('click', this._handleClose.bind(this));
        this.popup.addEventListener('click', this._handleCloseOverlay.bind(this));

    }

}