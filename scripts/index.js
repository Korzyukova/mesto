
import Card from './Сard.js';
import {FormValidator} from './FormValidate.js';



const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
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

const popupImage  = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__image-name');

const formElementProfile = document.querySelector('#formProfile');
const formElementCard = document.querySelector('#formCard');

const validationSettings={
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape);
}


function CreateCards()
{
    const container = document.querySelector('.photo-grid');
    initialCards.forEach(function (item, index, array) {
        const card = new Card(item.name, item.link, '#card', openPopup);
        
        container.insertAdjacentElement('afterbegin', card.getCard());
    })
}

document.addEventListener("DOMContentLoaded", () => {

    

    /*
    initialCards.forEach(function (item, index, array) {        
        container.insertAdjacentElement('afterbegin', createCard(item.name, item.link));
    })*/
    

    document.addEventListener('keydown', (e)=> {if (e.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }});
/*
    const popupImage  = document.querySelector('.popup__image');
    const imageName = document.querySelector('.popup__image-name');
    const imagePopup = document.querySelector('#imagePopup');
    */

    CreateCards();
});


/*
function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__item').src = link;
    card.querySelector('.photo-grid__item').alt = name;
    card.querySelector('.photo-grid__name').textContent = name;

    card.querySelector('.photo-grid__item').addEventListener('click', (item) => {
        popupImage.src = link;
        popupImage.alt = name;
        imageName.textContent = name;
        openPopup(imagePopup);
    });

    card.querySelector('.photo-grid__heart').addEventListener('click', (e) => {
        e.target.classList.toggle('photo-grid__heart_active');
    });

    card.querySelector('.trash').addEventListener('click', (e) => {
        e.target.closest('.photo-grid__rectangle').remove();
    });



    return card;
}

*/




// тут мы кнопкой Escape закрываем попапину

function handleEscape(e)
{
   if (e.key === 'Escape') {
       closePopup(document.querySelector('.popup_opened'))
   }
}




function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
}


profilePopupOpen.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    
    validatorProfile
});
cardPopupOpen.addEventListener('click', () => {

    openPopup(cardPopup);
});



profilePopupClose.addEventListener('click', function () { closePopup(profilePopup) });
cardPopupClose.addEventListener('click', function () { closePopup(cardPopup) });
imagePopupClose.addEventListener('click', function () { closePopup(imagePopup) });


    function submitFormHandlerProfile(evt) {
        console.log('event=', evt),
        evt.preventDefault();
        console.log('nameInput=', nameInput);
        console.log('jobInput=', jobInput);
    
    
    
        profileName.textContent = nameInput.value;
    
        profileDescription.textContent = jobInput.value;
    
        closePopup(profilePopup);
    }
    

function newCard(name, link)
{
    return (new Card(name, link, '#card')).getCard()   
}

function submitFormHandlerCard(evt) {
    evt.preventDefault();
    containerPhotoGrid.insertAdjacentElement('afterbegin', newCard(placeName.value, linkName.value));
    closePopup(cardPopup);
    linkName.value = '';
    placeName.value = '';
}


formElementCard.addEventListener('submit', submitFormHandlerCard);
formElementProfile.addEventListener('submit', submitFormHandlerProfile);

 

const formProfileElement = document.querySelector('#formProfile')
formProfileElement.addEventListener('click', function (event) {
    event.stopPropagation()
})

const formCardElement = document.querySelector('#formCard')
formCardElement.addEventListener('click', function (event) {
    event.stopPropagation()
})

const formImageElement = document.querySelector('#imagePopup')
formImageElement.addEventListener('click', function (event) {
    event.stopPropagation()
})


const profilePopupOverlayProfile = document.querySelector('#profilePopup')
profilePopupOverlayProfile.addEventListener('click', function (event) {
    closePopup(profilePopupOverlayProfile)
});



const profilePopupOverlayCard = document.querySelector('#cardPopup')
profilePopupOverlayCard.addEventListener('click', function (event) {
    closePopup(profilePopupOverlayCard)
});



const profilePopupOverlayImage = document.querySelector('#imagePopup')
profilePopupOverlayImage.addEventListener('click', function (event) {
    closePopup(profilePopupOverlayImage)
});
