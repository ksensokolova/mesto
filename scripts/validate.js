//функция установки слушателей
const setEventListeners = (config, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // чтобы проверить состояние кнопки при загрузке страницы
  toggleButtonState(config, inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(config, formElement, inputElement);
      // чтобы проверять массив при изменении любого из полей
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

//проверка на корректность введёных данных
const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showError(
      config,
      formElement,
      inputElement,
      /* 4. Передадим сообщение об ошибке. */
      inputElement.validationMessage
    );
  } else {
    // Если проходит, скроем
    hideError(config, formElement, inputElement);
  }
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (config, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.buttonDisabledClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.buttonDisabledClass);
    buttonElement.disabled = false;
  }
};

// Функция принимает массив полей и проверяет есть ли хотя бы одно невалидное поле
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

//функция валидации
const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(config, formElement);
  });
};

config = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__text',
  submitButtonSelector: '.popup-form__submit-btn',
  errorClass: 'popup-form__text_type_error',
  errorEnabledClass: 'popup-form__input-error_active',
  buttonDisabledClass: 'popup-form__submit-btn_type_disabled',
}
// Вызовем функцию
enableValidation(config);

//показать ошибку
const showError = (config, formElement, inputElement, errorMessage) => {
  // 1. Определяем элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.errorClass);
  // 2. Установим errorMessage в качестве значения textContent для errorElement
  errorElement.textContent = errorMessage;
  // 3. Добавим errorElement класс popup-form__input-error_active
  errorElement.classList.add(config.errorEnabledClass);
};

//скрыть ошибку
const hideError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClass);
  // 1. Удаляем активный класс ошибки c errorElement.
  errorElement.classList.remove(config.errorEnabledClass);
  // 2. Очищаем свойство textContent элемента errorElement.
  errorElement.textContent = '';
};
