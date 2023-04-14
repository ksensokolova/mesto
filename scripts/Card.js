export default class Card {
  constructor(initialCards, templateSelector, openBigImage) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._alt = initialCards.alt;
    this._templateSelector = templateSelector;
    this._openBigImage = openBigImage;
  }
  _getTemplate() {
    //забираем разметку из HTML и
    const templateNewCard = document
      .querySelector(this._templateSelector) //используем template-селектор
      .content.querySelector('.element') //извлечём содержимое и найдём элемент с классом element
      .cloneNode(true); //клонируем элемент
    //возвращаем клонированный элемент
    return templateNewCard;
  }

  generateCard() {
    //Запишем разметку в приватное поле _element, чтобы у других элементов появится доступ к ней
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.element__heading').textContent = this._name;
    this._imageCardZoom = this._element.querySelector('.element__image');
    this._imageCardZoom.src = this._link;
    this._imageCardZoom.alt = this._alt;
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector(
      '.element__button_action_delete'
    );
    this._setEventListeners(); // вызовим обработчики
    // Вернём элемент наружу
    return this._element;
  }
  //корзина
  _deleteCard() {
    this._element.remove();
  }
  //лайк
  _togglelike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._imageCardZoom.addEventListener('click', () => {
      this._openBigImage(this._name, this._link);
    });
  }
}
