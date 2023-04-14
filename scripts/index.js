import Card from './Card.js';
import { initialCards, config } from './constants.js';
import FormValidator from './FormValidator.js';

//profile
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__button_action_add');

//контейнер, где будут создаваться карточки
const cardsContainer = document.querySelector('.elements');

//массив из попапов
const popups = document.querySelectorAll('.popup');

//popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-form');

//formEditProfile внутри попапа
const formEditProfile = document.forms['edit-form'];
const nameInput = formEditProfile.querySelector('.popup-form__text_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup-form__text_type_additional'
);

//popupBigImage
const popupBigImage = document.querySelector('.popup_type_image-form');
const bigImageCard = document.querySelector('.popup__image');
const titleImageCard = document.querySelector('.popup__title');

//popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-form');

//formAddCard внутри попапа
const formAddCard = document.forms['add-form'];
const placeInput = formAddCard.querySelector('.popup-form__text_type_name');
const linkInput = formAddCard.querySelector(
  '.popup-form__text_type_additional'
);

//закрытие попапа с помощью Esc
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

//функция открытия - навешивание класса с попапом
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  //добавляем обработчик с функцией закрытия по нажатию на Esc и наличием класса открытия попапа
  document.addEventListener('keydown', closePopupByEsc);
};

//функция закрытия - снятия класса с попапом
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  //удаляем обработчик с функцией закрытия по нажатию на Esc и наличием класса открытия попапа
  document.removeEventListener('keydown', closePopupByEsc);
};

//установка закрытия попапа по оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    //закрываем любой попап, если он открыт
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    //закрываем любой попап, если нажать на крестик
    if (evt.target.classList.contains('popup__button_action_close')) {
      closePopup(popup);
    }
  });
});

//отправка данных из полей формы редактирования в profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  //запись данных из полей формы редактирования в profile
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//добавление карточки из формы добавления
function submitAddCardForm(evt) {
  evt.preventDefault();
  const formAddCard = evt.target;
  //запись данных из полей формы добавления в поля карточки
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  // Создаем карточку на основе данных
  createCard(card, cardsContainer);
  closePopup(popupAddCard);
}

//открытие попапа редактирования
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  formValidatorEditProfile.resetValidation();
  //запись данных из profile в поля формы редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

});

//открытие попапа добавления
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  formValidatorAddCard.resetValidation();
  //Вызываем функции из модуля валидации, конфиг в модуле констант, чтобы отключить кнопку
  formValidatorAddCard.disableButton();
});

//обработчик клика по кнопке Создать
formAddCard.addEventListener('submit', submitAddCardForm);
//обработчик клика по кнопке Сохранить
formEditProfile.addEventListener('submit', submitEditProfileForm);

//открытие попапа Image
function openBigImage(cardHeading, cardImage) {
  openPopup(popupBigImage);
  bigImageCard.src = cardImage;
  bigImageCard.alt = cardImage;
  titleImageCard.textContent = cardHeading;
}

function getCard(item) {
  // Создадим экземпляр карточки
  const newElementCard = new Card(item, '.elements__template', openBigImage);
  // Создаём карточку и возвращаем наружу
  const cardElement = newElementCard.generateCard();
  return cardElement;
}

function createCard(card) {
  const cardElement = getCard(card);
  //помещаем карточку в контейнер
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(createCard);

const formValidatorEditProfile = new FormValidator(config, formEditProfile);
formValidatorEditProfile.enableValidation();
const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();
