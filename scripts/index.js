//profile
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__button_action_add');

//контейнер, где будут создаваться карточки
const cardsContainer = document.querySelector('.elements');

//popup
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');

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

//функция навешивания/снятия класса с попапом
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
};

//отправка данных из полей формы редактирования в profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  //запись данных из полей формы редактирования в profile
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}

//отрисовка карточек
const createCard = (card) => {
  // Клонируем шаблон, наполняем его информацией из объекта
  const templateNewCard = document
    .querySelector('.elements__template')
    .content.cloneNode(true);
  const cardHeading = templateNewCard.querySelector('.element__heading');
  const cardImage = templateNewCard.querySelector('.element__image');
  cardHeading.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);
  //выбор картинки для попапа image
  const openImage = templateNewCard.querySelector('.element__image');
  openImage.addEventListener('click', function () {
    toggleBigImage(cardHeading, cardImage);
  });
  //выбор кнопки для удаления карточки выбор элемента и обработчик по клику
  const deleteButton = templateNewCard.querySelector(
    '.element__button_action_delete'
  );
  deleteButton.addEventListener('click', deleteCardButton);
  //лайк карточке выбор элемента и обработчик по клику
  templateNewCard
    .querySelector('.element__like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
  // Возвращаем получившуюся карточку
  return templateNewCard;
};

const renderCard = (card, cardsContainer) => {
  // Создаем карточку на основе данных
  const newElementCard = createCard(card);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(newElementCard);
};

//запуск цикла для создания каждой карточки из массива
initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});

//добавление карточки из формы добавления
function submitAddCardForm(evt) {
  evt.preventDefault();
  const formAddCard = evt.target;
  //запись данных из полей формы добавления в поля карточки
  card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  // Создаем карточку на основе данных
  renderCard(card, cardsContainer);
  togglePopup(popupAddCard);
  formAddCard.reset();
}

//удаление карточки
function deleteCardButton(evt) {
  const buttonRemove = evt.target;
  const cardRemove = buttonRemove.closest('.element');
  cardRemove.remove();
}

//открытие попапа редактирования
profileEditButton.addEventListener('click', function () {
  togglePopup(popupEditProfile);
  //запись данных из profile в поля формы редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

//закрытие попапа редактирования
buttonEditClose.addEventListener('click', function () {
  togglePopup(popupEditProfile);
});

//открытие попапа добавления
profileAddButton.addEventListener('click', function () {
  togglePopup(popupAddCard);
});

//закрытие попапа добавления
buttonAddClose.addEventListener('click', function () {
  togglePopup(popupAddCard);
});

//открытие попапа Image
const toggleBigImage = function (cardHeading, cardImage) {
  togglePopup(popupBigImage);
  bigImageCard.src = cardImage.src;
  bigImageCard.alt = cardImage.alt;
  titleImageCard.textContent = cardHeading.textContent;
};

//закрытие попапа Image
buttonImageClose.addEventListener('click', function () {
  togglePopup(popupBigImage);
});

//обработчик клика по кнопке Создать
formAddCard.addEventListener('submit', submitAddCardForm);
//обработчик клика по кнопке Сохранить
formEditProfile.addEventListener('submit', submitEditProfileForm);
