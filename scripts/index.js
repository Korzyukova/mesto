

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
const imagePopupClose = imagePopup.querySelector('.popup__closed-image');

const cardTemplate = document.querySelector('#card').content.querySelector('.photo-grid__rectangle');

const containerPhotoGrid = document.querySelector('.photo-grid');

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

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector('.photo-grid');

    initialCards.forEach(function (item, index, array) {
        container.insertAdjacentElement('afterbegin', createCard(item.name, item.link));
    })
});

function createCard(name, link)
{
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.photo-grid__item').src = link;
    card.querySelector('.photo-grid__item').alt = name;
    card.querySelector('.photo-grid__name').textContent = name;

    card.querySelector('.photo-grid__item').addEventListener('click', (item) => {
        document.querySelector('.popup__image').src = link;
        document.querySelector('.popup__image').alt = name;
        document.querySelector('.popup__image-name').textContent = name;
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

function openPopup(popup)
{
    popup.classList.add('popup_opened');
}

function closePopup(popup)
{

    popup.classList.remove('popup_opened');
}


profilePopupOpen.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
});
cardPopupOpen.addEventListener('click', () => {
    
    openPopup(cardPopup);
});



profilePopupClose.addEventListener('click', function() {closePopup(profilePopup)});
cardPopupClose.addEventListener('click', function() {closePopup(cardPopup)});
imagePopupClose.addEventListener('click', function() {closePopup(imagePopup)});

const formElementProfile = document.querySelector('#formProfile');
const formElementCard = document.querySelector('#formCard');
const formElementPicture = document.querySelector('#formPicture');


function formSubmitHandlerProfile(evt) {

}


function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    containerPhotoGrid.insertAdjacentElement('afterbegin', createCard(placeName.value, linkName.value));
    closePopup(cardPopup);
    linkName.value = '';
    placeName.value = '';
}

//formElementProfile.addEventListener('submit', formSubmitHandlerProfile);


formElementCard.addEventListener('submit', formSubmitHandlerCard);





//const formElementProfile = document.querySelector('#formProfile');
const inputSelector = formElementProfile.querySelectorAll('.popup__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
  element.classList.add('popup__input_type_error');

  const formErrorSpan = document.querySelector(`.${element.id}_error`);
  formErrorSpan.classList.add('span_show');

  const nameInputElement = document.getElementById('nameInput')
  const aboutInputElement = document.getElementById('aboutInput')
  const isNameInputValid = nameInputElement.validity.valid;
  const isAboutInputValid = aboutInputElement.validity.valid;

  if (!isNameInputValid || !isAboutInputValid) {
    document.querySelector('.popup__submit').disabled = true;
  }
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    
  element.classList.remove('popup__input_type_error');

  const formErrorSpan = document.querySelector(`.${element.id}_error`);
  formErrorSpan.classList.remove('span_show');
  
  const nameInputElement = document.getElementById('nameInput')
  const aboutInputElement = document.getElementById('aboutInput')
  const isNameInputValid = nameInputElement.validity.valid;
  const isAboutInputValid = aboutInputElement.validity.valid;

  if (isNameInputValid && isAboutInputValid) {
    document.querySelector('.popup__submit').disabled = false;
  }
};

// Функция, которая проверяет валидность поля
const isValid = (event) => {
    console.log(event);
        if (!event.target.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            showInputError(event.target);
          } else {
            // Если проходит, скроем
            hideInputError(event.target);
          }
};
 
formElementProfile.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту

let valid = true;

  inputSelector.forEach(function (item) {

    if (!item.validity.valid)
    {
        valid = false;
    }
});

if (valid)
{
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}
  

  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа


inputSelector.forEach(function (item) {
    item.addEventListener('input', isValid);
});



const formInput = formElementProfile.querySelector('.popup__input');
const formError = formElementProfile.querySelector(`.${nameInput.id}_error`);

const formProfileElement = document.getElementById('formProfile')
formProfileElement.addEventListener('click', function(event) {
    event.stopPropagation()
})

const profilePopupOverlay = document.getElementById('profilePopup')
profilePopupOverlay.addEventListener('click', function(event) {
    closePopup(profilePopupOverlay)
});

// // включение валидации вызовом enableValidation
// // все настройки передаются при вызове

// // enableValidation({
// //     formSelector: '.popup__form',
// //     inputSelector: '.popup__input',
// //     submitButtonSelector: '.popup__button',
// //     inactiveButtonClass: 'popup__button_disabled',
// //     inputErrorClass: 'popup__input_type_error',
// //     errorClass: 'popup__error_visible'
// //   });










// function getName() {
//     const firstName = [
//         'Masha',
//         'Katya',
//         'Tanya',
//         'Yulya'
//     ];
//     const lastName = [
//         'Ivanova',
//         'Petrova',
//         'Sidorova',
//         'Korzyukova'
//     ];

//     return {name:pick(firstName),lastname:pick(lastName)};
// };