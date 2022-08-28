import './index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidate.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupImage.js';



const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const placeName = document.querySelector('.popup__input_type_place-name');
const linkName = document.querySelector('.popup__input_type_link');

const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const imagePopup = document.querySelector('#imagePopup');
const profilePopupOpen = document.querySelector('.profile__edit-button');
const cardPopupOpen = document.querySelector('.profile__add-button');

const profilePopupClose = profilePopup.querySelector('.popup__closed');
const cardPopupClose = cardPopup.querySelector('.popup__closed');
const imagePopupClose = imagePopup.querySelector('.popup__closed');

const cardTemplate = document.querySelector('#card').content.querySelector('.photo-grid__rectangle');

const containerPhotoGrid = document.querySelector('.photo-grid');

const popupImage = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-name');

const formElementProfile = document.querySelector('#formProfile');
const formElementCard = document.querySelector('#formCard');

const validationSettings = {
    formSelector: 'popup__container',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
};

const validatorProfile = new FormValidator(validationSettings, formElementProfile);
validatorProfile.enableValidation();
const validatorCard = new FormValidator(validationSettings, formElementCard);
validatorCard.enableValidation();

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



function createCard(item)
{
    const card = new Card(item, '#card', openImage);
    return  card.generateCard();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardsList.addItem(card);
    }
},
    '.photo-grid'
);


cardsList.renderItems();


/*
function submitFormHandlerProfile(evt) {
    evt.preventDefault();
    const userInfo = new UserInfo('.profile__name', '.profile__description');
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    profilePopUp.close();
}

formElementProfile.addEventListener('submit', submitFormHandlerProfile);
*/
/*
cardPopupOpen.addEventListener('click', () => {
    cardPopUp.open();
});*/
/*
function submitFormHandlerCard(evt) {
    evt.preventDefault();
    //containerPhotoGrid.prepend(newCard(placeName.value, linkName.value));

    const card = new Card({
        name: placeName.value,
        link: linkName.value,
    }, '#card');
    const cardElement = card.generateCard();

    cardsList.prependItem(cardElement);

    cardPopUp.close();
    linkName.value = '';
    placeName.value = '';
    validatorCard.validate();
}
*/
/*formElementCard.addEventListener('submit', submitFormHandlerCard);*/

const profileInfo = new UserInfo('.profile__name', '.profile__description');

function openImage()
{
    popUpWithImage.open(this._item.link, this._item.name);
}

const popUpWithImage = new PopupWithImage('#imagePopup');
const profilePopUp = new PopupWithForm('#profilePopup', (e)=>{
    profileInfo.setUserInfo(e.name, e.about);
    profilePopUp.close();
});


const addCardPopUp = new PopupWithForm('#cardPopup', (e)=> { 
    const card = createCard({
        name: e.name,
        link: e.link
    });
    cardsList.prependItem(card);

    addCardPopUp.close();
});


profilePopupOpen.addEventListener('click', () => {
    profilePopUp.open();
    var userInfo = profileInfo.getUserInfo();
    profilePopUp._setInputValues({ name: userInfo.name, about:  userInfo.description});
});

cardPopupOpen.addEventListener('click', () => {
    addCardPopUp.open();
});