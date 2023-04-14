export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  //проверка на корректность введёных данных
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showError(
        inputElement,
        /* 4. Передадим сообщение об ошибке. */
        inputElement.validationMessage
      );
    } else {
      //    // Если проходит, скроем
      this._hideError(inputElement);
    }
  }

  //функция выключения кнопки
  disableButton() {
    this._buttonElement.classList.add(this._config.buttonDisabledClass);
    this._buttonElement.disabled = true;
  }

  //функция включения кнопки
  _enableButton = () => {
    this._buttonElement.classList.remove(this._config.buttonDisabledClass);
    this._buttonElement.disabled = false;
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputList) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this.disableButton();
    } else {
      // иначе сделай кнопку активной
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        // чтобы проверять массив при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  // Функция принимает массив полей и проверяет есть ли хотя бы одно невалидное поле
  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  //функция валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для формы вызовем функцию setEventListeners
    this._setEventListeners();
  }

  resetValidation() {
    //для управления кнопкой
    this._toggleButtonState();
    //проходим по полям
    this._inputList.forEach((inputElement) => {
      //очищаем ошибки
      this._hideError(inputElement);
      this._formElement.reset();
    });
  }

  //показать ошибку
  _showError(inputElement, errorMessage) {
    // 1. Определяем элемент ошибки
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.errorClass);
    // 2. Установим errorMessage в качестве значения textContent для errorElement
    errorElement.textContent = errorMessage;
    // 3. Добавим errorElement класс popup-form__input-error_active
    errorElement.classList.add(this._config.errorEnabledClass);
  }

  //скрыть ошибку
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.errorClass);
    // 1. Удаляем активный класс ошибки c errorElement.
    errorElement.classList.remove(this._config.errorEnabledClass);
    // 2. Очищаем свойство textContent элемента errorElement.
    errorElement.textContent = '';
  }
}
