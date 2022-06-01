const nameInput = document.querySelector('.popup__input_type_name');
//переменная поля ввода имени в попапе профайла
const jobInput = document.querySelector('.popup__input_type_about');
//переменная поля ввода О себе в попапе профайла
const profileName = document.querySelector('.profile__name');
//переменная имени, которое будет в заголовке
const profileDescription = document.querySelector('.profile__description');
//переменная строки О себе, которая будет в заголовке
const placeName = document.querySelector('.popup__input_type_place-name');
//переменная поля ввода названия в попапе добавления картинки
const linkName = document.querySelector('.popup__input_type_link');
//переменная поля ввода ссылки на картинку в попапе добавления картинки
const profilePopup = document.querySelector('#profilePopup');
//переменная всей формы попапа для профиля
const cardPopup = document.querySelector('#cardPopup');
//переменная всей формы попапа для картинки
const imagePopup = document.querySelector('#imagePopup');
//переменная для всей формы попапа всплывающей картинки при нажатии
const profilePopupOpen = document.querySelector('.profile__edit-button');
//переменная на кнопку для открытия попапа профайла
const cardPopupOpen = document.querySelector('.profile__add-button');
//кнопка открытия попапа для добавления карточки
const profilePopupClose = document.querySelector('.popup__closed');
//кнопка закрытия попапа профайла(крестик)
const cardPopupClose = document.querySelector('.popup__closed');
//кнопка закрытия попапа карточки(крестик)
const imagePopupClose = imagePopup.querySelector('.popup__closed');
//кнопка закрытия всплывающей большой фото(крестик)
const cardTemplate = document.querySelector('#card').content.querySelector('.photo-grid__rectangle');
//переменная для шаблона карты с контентом(сама карточка)
const containerPhotoGrid = document.querySelector('.photo-grid');
//переменная для всей сетки с карточками(сюда их потом передаем, пока оно пусто)
const popupImage = document.querySelector('.popup__image');
//перемменная на попап всплывающую картинку
const imageName = document.querySelector('.popup__image-name');
//переменная на подпись к всплывающей картинке
const formElementProfie = document.querySelector('#formProfile');
//переменная на форму профайла
const formElementCard = document.querySelector('#formCard');
//переменная на форму карточки

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
//создаем карточки, которые будут сразу при открытии сайта

document.addEventListener("DomContentLoaded", () => {
    //после загрузки страницы идет ивент( данном случае создаютм=ся карточки)

    const container = document.querySelector('.photo-grid');
    //переменная на всю сетку из картинок

    initialCards.forEach(function (item, index, array) {
        container.insertAdjacentElement('afterbegin', createCard (item.name, item.link));

    })
} );
//тут мы создали сетку и добавляем в нее карточки по очереди, новая идет впереди

function createCard(name,link) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__item').src = link;
    card.querySelector('.photo-grid__item').alt = name;
    card.querySelector('.photo-grid__name').textContent = name;

    card.querySelector('.photo-grid__item').addEventListener('click', (item) =>{
        popupImage.src = link;
        popupImage.alt = name;
        imageName.textContent = name;
        openPopup(imagePopup);
    })
//по клику вылазит большая картинка с подписью

card.querySelector('.photo-grid__heart').addEventListener('click', (e) => {
    e.target.classList.toggle('.photo-grid__heart_active');
});
//переключаем сердечко

card.querySelector('.trash').addEventListener('click', (e) =>{
    e.target.closest('.photo-grid__rectangle').remove();
});
//при нажатии на корзинку удаляем карточку

return card;
}

function handleEscape(e)
{
    if (e.key === 'Escape'){
        closePopup(document.querySelector('popup_opened'))
    }
}
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscape)
    
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
}
// удаляем попап по кнопке Escape

profilePopupOpen.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    //при открытии в поля попапа заносятся уже существующие данные
    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event ('input'));
    //ввод новых данных 
});
 cardPopupOpen.addEventListener('click', () => {
     openPopup(cardPopup);
 });
 //открываем попап при клике на кнопку добавления карты

profilePopupClose.addEventListener('click', function(){
    closePopup(profilePopup)
});
//закрываем попап профиля

cardPopupClose.addEventListener('click', function(){
   closePopup(cardPopup)
});
//закрываем попап карточки

imagePopupClose.addEventListener('click', function() {
    closePopup(imagePopup)
});
//закрыли попап  картинки

function submitFormHandlerProfile(evt) {
    console.log ('event=', evt),
    evt.preventDefault();
    console.log('nameInput=', nameInput);
    console.log('jobInput=', jobInput);

    profileName.textContent = nameInput.value;
    //вводятся данные из попапа профайла в профайл

    profileDescription.textContent = jobInput.value;
    //вводятся данные из попапа профайла в профайл

    closePopup(profilePopup);
}

function submitFormHandlerCard(evt) {
    evt.preventDefault();
    //ЗАЧЕМ
    containerPhotoGrid.insertAdjacentElement('afterbegin', createCard(placeName.value, linkName.value));
    //добавляем карточку в начало
    closePopup(cardPopup);
    
    linkName.value = '';
    placeName.value = '';
    linkName.dispatchEvent(new Event('input'));
    placeName.dispatchEvent(new Event('input'));
    //ввод новых данных
}

 formElementCard.addEventListener('submit',submitFormHandlerCard);
 //отправляем карточку

 formElementProfie.addEventListener('submit', submitFormHandlerProfile);
 //отправляем в профайл

 const formProfileElement = document.querySelector('#formprofile')
 formElementProfieElement.addEventListener('click', function(event){
     event.stopPropagation()
 })
//ЗАЧЕМ

const formCardElement = document.querySelector('#formCard')
formCardElement.addEventListener('click', function (event) {
    event.stopPropagation()
})

const formImageElement = document.querySelector('#imagePopup')
formImageElement.addEventListener('click', function (event) {
    event.stopPropagation()
})

const profilePopupOverlayProfile = document.querySelector('#profilePopup')
profilePopupOverlayProfile.addEventListener('click', function(event){
    closePopup(profilePopupOverlayProfile)
});
//закрываем попап при клике на сам попап

const profilePopupOverlayCard = document.querySelector('#cardPopup')
profilePopupOverlayCard.addEventListener('click', function (event) {
    closePopup(profilePopupOverlayCard)
});

const profilePopupOverlayImage = document.querySelector('#imagePopup')
profilePopupOverlayImage.addEventListener('click', function (event) {
    closePopup(profilePopupOverlayImage)
});

// включение валидации вызовом enableValidation
// все настройки передаются при вызове



const enableValidation = (settings) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, settings);
    });
};

// фукция enable/disable Save button
const enableDisableSaveButton = (buttonElement, inputList) => {
  if (inputList.some(el => !el.validity.valid)) {
    // если есть хотя бы одно поле, не прошедшее валидацию, кнопка будет неактивна
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`)
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, settings);
        enableDisableSaveButton(buttonElement, inputList)
      });
    });
};
  
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = inputElement.nextElementSibling;
       // Остальной код такой же
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    // Находим элемент ошибки
    const errorElement = inputElement.nextElementSibling;
    // Остальной код такой же
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

enableValidation({
  formSelector: 'popup__container',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}); 



// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement, settings);
    }
  };

class FormValidator
{
  constructor (settings, element)
  {}
  enableValidation()
  {}

}