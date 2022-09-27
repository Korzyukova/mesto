import { FormValidator } from '../components/FormValidate.js';
import Api  from '../components/Api.js';

export const profilePopupOpen = document.querySelector('.profile__edit-button');
export const cardPopupOpen = document.querySelector('.profile__add-button');
export const profilePictureEdit = document.querySelector('.profile__picture-edit');

const formElementProfile = document.querySelector('#formProfile');
const formElementCard = document.querySelector('#formCard');
const formElementAvatar = document.querySelector('#formAvatar');


const validationSettings = {
    formSelector: 'popup__container',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
};

export const validatorProfile = new FormValidator(validationSettings, formElementProfile);
validatorProfile.enableValidation();
export const validatorCard = new FormValidator(validationSettings, formElementCard);
validatorCard.enableValidation();
export const validatorAvatar = new FormValidator(validationSettings, formElementAvatar);
validatorAvatar.enableValidation();



export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
        authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c',
        'Content-Type': 'application/json'
    }
});
