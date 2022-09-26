import './index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import { FormValidator } from '../components/FormValidate.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupImage.js';
import Api from '../components/Api.js';


const profileName = document.getElementById('profile_name');
const profileDescription = document.querySelector('.profile__description');
const placeName = document.querySelector('.popup__input_type_place-name');
const linkName = document.querySelector('.popup__input_type_link');

const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const imagePopup = document.querySelector('#imagePopup');
const profilePopupOpen = document.querySelector('.profile__edit-button');
const cardPopupOpen = document.querySelector('.profile__add-button');
const profilePicture = document.querySelector('.profile__picture-image');
const profilePictureEdit = document.querySelector('.profile__picture-edit');
const profilePopupClose = profilePopup.querySelector('.popup__closed');
const cardPopupClose = cardPopup.querySelector('.popup__closed');
const imagePopupClose = imagePopup.querySelector('.popup__closed');

const cardTemplate = document.querySelector('#card').content.querySelector('.photo-grid__rectangle');

const containerPhotoGrid = document.querySelector('.photo-grid');

const popupImage = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-name');

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

const validatorProfile = new FormValidator(validationSettings, formElementProfile);
validatorProfile.enableValidation();
const validatorCard = new FormValidator(validationSettings, formElementCard);
validatorCard.enableValidation();
const validatorAvatar = new FormValidator(validationSettings, formElementAvatar);
validatorAvatar.enableValidation();



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
      authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c',
      'Content-Type': 'application/json'
    }
  }); 


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
    const card = new Card(item, '#card', openImage, (e)=> {
        confirmDeletePopUp.open(e);
    });
    return  card.generateCard();
}



const profileId ="";


getData('https://mesto.nomoreparties.co/v1/cohort-50/users/me')
.then(res => {
    profileName.innerText = res.name;
    profileDescription.innerText = res.about;
 
});

api.getProfile()
.then((data) => {
    console.log(data);
    profileName.innerText = data.name;
        profileDescription.innerText = data.about;
        profilePicture.src = data.avatar;
    
});



const profileInfo = new UserInfo('.profile__name', '.profile__description');

function openImage(item)
{
    popUpWithImage.open(item.link, item.name);
}

const popUpWithImage = new PopupWithImage('#imagePopup');
const profilePopUp = new PopupWithForm('#profilePopup', (e)=>{
    profilePopUp.popup.querySelector('button[type=submit]').textContent = 'Сохранение...';    
    api.patchProfile({
        name: e.name,
        about: e.about
      }).then((data) => {

        profileInfo.setUserInfo(e.name, e.about);
        profilePopUp.popup.querySelector('button[type=submit]').textContent = 'Сохранить';
        profilePopUp.close();

      });
});


const addCardPopUp = new PopupWithForm('#cardPopup', (e)=> { 
    addCardPopUp.popup.querySelector('button[type=submit]').textContent = 'Сохранение...';
api.postInitialCards({
        name: e.name,
        link: e.link
       })


.then(res => res.json())
  .then((data) => {
    console.log(data);

    const card = createCard(data);
    cardsList.prependItem(card);
    addCardPopUp.popup.querySelector('button[type=submit]').textContent = 'Создать';

    addCardPopUp.close();
  });
});


const confirmDeletePopUp = new PopupDelete('#deletePopup', (e)=> { 
    api.deleteCard(e._id);
    document.getElementById(e._id).remove();
    
    confirmDeletePopUp.close();
});

const changeAvatarPopUp = new PopupWithForm('#avatarPopup', (e)=> { 
    changeAvatarPopUp.popup.querySelector('button[type=submit]').textContent = 'Сохранение...';
    api.patchAvatar(e.link).then((data) => {
        profilePicture.src = e.link;
        changeAvatarPopUp.popup.querySelector('button[type=submit]').textContent = 'Сохранить';
        changeAvatarPopUp.close();
    });
});


profilePopupOpen.addEventListener('click', () => {
    profilePopUp.open();
    var userInfo = profileInfo.getUserInfo();
    profilePopUp._setInputValues({ name: userInfo.name, about:  userInfo.description});
});

cardPopupOpen.addEventListener('click', () => {
    addCardPopUp.open();
    validatorAvatar.validate();
});



profilePictureEdit.addEventListener('click', () => {
    changeAvatarPopUp.open();
    validatorCard.validate();
});



async function getData(url) {
    const data = await fetch(url, {
        headers: {
          authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c'
        }
    })
    .catch((err) => console.error(err));
    return data.json();
}

let cardsList = null;

api.getInitialCards()
.then(res => {
    console.log('sd');
    console.log(res);

    cardsList = new Section({
        items: res,
        renderer: (item) => {
            const card = createCard(item);
            cardsList.addItem(card);
        }
    },
        '.photo-grid'
    );
    cardsList.renderItems();
});

