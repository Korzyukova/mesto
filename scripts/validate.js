
 const inputSelector = document.querySelectorAll('.popup__input');

 // Функция, которая добавляет класс с ошибкой
 const showInputError = (element) => {
     element.classList.add('popup__input_type_error');
 
     const formErrorSpan = document.querySelector(`.${element.id}_error`);
     formErrorSpan.classList.add('span_show');
 
     const nameInputElement = document.getElementById('nameInput')
     const aboutInputElement = document.getElementById('aboutInput')
     const placeInputElement = document.getElementById('placeInput')
     const linkInputElement = document.getElementById('linkInput')
 
     const isNameInputValid = nameInputElement.validity.valid;
     const isAboutInputValid = aboutInputElement.validity.valid;
     const isPlaceInputValid = placeInputElement.validity.valid;
     const isLinkInputValid = linkInputElement.validity.valid;
 
     if (!isNameInputValid || !isAboutInputValid) {
         document.querySelector('#submitProfile').disabled = true;
     }
 
     if (!isPlaceInputValid || !isLinkInputValid) {
         document.querySelector('#submitCard').disabled = true;
     }
 };
 
 // Функция, которая удаляет класс с ошибкой
 const hideInputError = (element) => {
 
     element.classList.remove('popup__input_type_error');
 
     const formErrorSpan = document.querySelector(`.${element.id}_error`);
     formErrorSpan.classList.remove('span_show');
 
     const nameInputElement = document.getElementById('nameInput')
     const aboutInputElement = document.getElementById('aboutInput')
     const placeInputElement = document.getElementById('placeInput')
     const linkInputElement = document.getElementById('linkInput')
 
     const isNameInputValid = nameInputElement.validity.valid;
     const isAboutInputValid = aboutInputElement.validity.valid;
     const isPlaceInputValid = placeInputElement.validity.valid;
     const isLinkInputValid = linkInputElement.validity.valid;
 
     if ((isNameInputValid && isAboutInputValid) || (isPlaceInputValid && isLinkInputValid)) {
         const buttons = document.querySelectorAll('.popup__submit');
         buttons.forEach(function (item) {
             item.disabled = false;
         });
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
 
         if (!item.validity.valid) {
             valid = false;
         }
     });
 
     if (valid) {
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
 formProfileElement.addEventListener('click', function (event) {
     event.stopPropagation()
 })
 
 
 const profilePopupOverlayProfile = document.getElementById('profilePopup')
 profilePopupOverlayProfile.addEventListener('click', function (event) {
     closePopup(profilePopupOverlayProfile)
 });
 
 
 const formCardElement = document.getElementById('formCard')
 formCardElement.addEventListener('click', function (event) {
     event.stopPropagation()
 })
 
 const profilePopupOverlayCard = document.getElementById('cardPopup')
 profilePopupOverlayCard.addEventListener('click', function (event) {
     closePopup(profilePopupOverlayCard)
 });
 
 document.addEventListener('keydown', function (e) {
     if (e.key === 'Escape') {
         closePopup(profilePopupOverlayProfile)
         hideModal()
     }
 });
 
 document.addEventListener('keydown', function (e) {
     if (e.key === 'Escape') {
         closePopup(profilePopupOverlayCard)
         hideModal()
     }
 });
 
 