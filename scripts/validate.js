// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export class FormValidator
{
  constructor (settings, formElement){
    this.settings = settings;
    this.formElement = formElement;

     // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    //const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
    // Переберём полученную коллекцию
    //formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners(formElement, settings);
    //});
  }

_setEventListeners(formElement) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(`.${this.settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${this.settings.submitButtonSelector}`)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      this._isValid(formElement, inputElement, this.settings);
      //this.isValid(inputElement)
      enableDisableSaveButton(buttonElement, inputList)
    });
  });
  
};

_isValid(inputElement, formElement)
  {
      if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage, this.settings);
      } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement, this.settings);
      }
  }
}


export const enableValidation = (settings) => {
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
export const enableDisableSaveButton = (buttonElement, inputList) => {
  if (inputList.some(el => !el.validity.valid)) {
    // если есть хотя бы одно поле, не прошедшее валидацию, кнопка будет неактивна
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

export const setEventListeners = (formElement, settings) => {
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
  
export const showInputError = (formElement, inputElement, errorMessage, settings) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = inputElement.nextElementSibling;
       // Остальной код такой же
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  export const hideInputError = (formElement, inputElement, settings) => {
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

export const isValid = (formElement, inputElement, settings) => {
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
  