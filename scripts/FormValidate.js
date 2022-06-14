// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export class FormValidator
{
  constructor (settings, formElement){
    this.settings = settings;
    this._formElement = formElement;
    
    this._inputList = Array.from(formElement.querySelectorAll(`.${this.settings.inputSelector}`));
    this._buttonElement = formElement.querySelector(`.${this.settings.submitButtonSelector}`)
    
    
     // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    //const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
    // Переберём полученную коллекцию
    // //formList.forEach((formElement) => {
    //   formElement.addEventListener('submit', (evt) => {
    //     // У каждой формы отменим стандартное поведение
    //     evt.preventDefault();
    //   });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      
    //});
  }
  enableValidation=()=>
  {
    this._setEventListeners();
  }

_setEventListeners = () => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  
  // Обойдём все элементы полученной коллекции
  this._inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._isValid(inputElement);
      this._enableDisableSaveButton()
    });
  });
};

validate()
{
  this._inputList.forEach((inputElement) => {
      this._isValid(inputElement);
  });
  this._enableDisableSaveButton()
}

_isValid(inputElement)
  {
      if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        this._hideInputError(inputElement);
      }
  }

_enableDisableSaveButton = () => {
  
  if (this._inputList.some(el => !el.validity.valid)) {
    // если есть хотя бы одно поле, не прошедшее валидацию, кнопка будет неактивна
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.disabled = false;
  }
}

_showInputError = (inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = inputElement.nextElementSibling;
     // Остальной код такой же
  inputElement.classList.add(this.settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  // errorElement.classList.add(settings.errorClass);
};

_hideInputError = (inputElement) => {
  // Находим элемент ошибки
  const errorElement = inputElement.nextElementSibling;
  // Остальной код такой же
  inputElement.classList.remove(this.settings.inputErrorClass);
  errorElement.classList.remove(this.settings.errorClass);
  errorElement.textContent = '';
};

}

// enableValidation({
//   formSelector: 'popup__container',
//   inputSelector: 'popup__input',
//   submitButtonSelector: 'popup__submit',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'form__input-error_active'
// }); 

//ЗДЕСЬ ЗАКОНЧИЛСЯ КЛАСС

// const enableValidation = (settings) => {
//     // Найдём все формы с указанным классом в DOM,
//     // сделаем из них массив методом Array.from
    
//     const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
//     // Переберём полученную коллекцию
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         // У каждой формы отменим стандартное поведение
//         evt.preventDefault();
//       });
  
//       // Для каждой формы вызовем функцию setEventListeners,
//       // передав ей элемент формы
//       setEventListeners(formElement, settings);
//     });
// };

// фукция enable/disable Save button
 



  
  

// enableValidation({
  
//   // errorClass: 'form__input-error_active'
// }); 



// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости


  