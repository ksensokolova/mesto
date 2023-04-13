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
const overlayList = Array.from(document.querySelectorAll('.popup'));

//popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-form');
const buttonEditClose = popupEditProfile.querySelector(
  '.popup__button_action_close'
);

//formEditProfile внутри попапа
const formEditProfile = popupEditProfile.querySelector('.popup-form');
const nameInput = formEditProfile.querySelector('.popup-form__text_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup-form__text_type_additional'
);

//popupBigImage
const popupBigImage = document.querySelector('.popup_type_image-form');
const buttonImageClose = popupBigImage.querySelector(
  '.popup__button_action_close'
);
const bigImageCard = document.querySelector('.popup__image');
const titleImageCard = document.querySelector('.popup__title');

//popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-form');
const buttonAddClose = popupAddCard.querySelector(
  '.popup__button_action_close'
);

//formAddCard внутри попапа
const formAddCard = popupAddCard.querySelector('.popup-form');
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
overlayList.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
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
  formAddCard.reset();

  //Вызываем функции из модуля валидации, конфиг в модуле констант, чтобы отключить кнопку
  const FormValidatorAddCard = new FormValidator(config, formAddCard);
  FormValidatorAddCard.disableButton();
}

//открытие попапа редактирования
profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  //запись данных из profile в поля формы редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

//закрытие попапа редактирования
buttonEditClose.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//открытие попапа добавления
profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//закрытие попапа добавления
buttonAddClose.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//закрытие попапа Image
buttonImageClose.addEventListener('click', function () {
  closePopup(popupBigImage);
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

function createCard(card) {
  // Создадим экземпляр карточки
  const newElementCard = new Card(card, '.elements__template', openBigImage);
  // Создаём карточку и возвращаем наружу
  const cardsContainer = newElementCard.generateCard();
  // Добавляем в DOM
  document.querySelector('.elements').prepend(cardsContainer);
}

initialCards.forEach(createCard);

const card = new Card(initialCards, '.elements__template', openBigImage);

const FormValidatorEditProfile = new FormValidator(config, formEditProfile);
FormValidatorEditProfile.enableValidation();
const FormValidatorAddCard = new FormValidator(config, formAddCard);
FormValidatorAddCard.enableValidation();
