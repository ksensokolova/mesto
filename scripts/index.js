//profile
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileAddButton = document.querySelector('.profile__button_action_add');

//popup
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');

//функция навешивания/снятия класса с попапом
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
};

//editPopup
const editPopup = document.querySelector('.popup__edit-form');
const buttonEditClose = editPopup.querySelector('.popup__button_action_close');

//edit-form внутри попапа
const formEdit = editPopup.querySelector('.popup-form');
const nameInput = formEdit.querySelector('.popup-form__text_type_name');
const jobInput = formEdit.querySelector('.popup-form__text_type_additional');

//открытие попапа редактирования
profileEditButton.addEventListener('click', function () {
  togglePopup(editPopup);
  //запись данных из profile в поля формы редактирования
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

//закрытие попапа редактирования
buttonEditClose.addEventListener('click', function () {
  togglePopup(editPopup);
});

//отправка данных из полей формы редактирования в profile
function handleFormSubmit(evt) {
  evt.preventDefault();
  //запись данных из полей формы редактирования в profile
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  togglePopup(editPopup);
}

//imagePopup
const imagePopup = document.querySelector('.popup__image-form');
const buttonImageClose = imagePopup.querySelector(
  '.popup__button_action_close'
);
const bigImageCard = document.querySelector('.popup__image');
const titleImageCard = document.querySelector('.popup__title');

//закрытие попапа image
buttonImageClose.addEventListener('click', function () {
  togglePopup(imagePopup);
});

//контейнер, где будут создаваться карточки
const CardsContainer = document.querySelector('.elements');

//массив карточек, которые добавляются в elements
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Вид на Архыз.',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Вид на Челябинскую область.',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Вид на Иваново.',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Вид на Камчатку',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Вид на Холмогорский район.',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Вид на на Байкал.',
  },
];


//динамическое создание карточки из шаблона
const createCard = (card) => {
  const NewCard = document
    .querySelector('.card__template')
    .content.cloneNode(true);
  const cardHeading = NewCard.querySelector('.element__heading');
  const cardImage = NewCard.querySelector('.element__image');
  cardHeading.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);

  //для удаления карточки выбор элемента и обработчик по клику
  const deleteButton = NewCard.querySelector('.element__button_action_delete');
  deleteButton.addEventListener('click', deleteCardButton);

  //лайк карточке
  NewCard.querySelector('.element__like').addEventListener(
    'click',
    function (evt) {
      evt.target.classList.toggle('element__like_active');
    }
  );

  //открытие попапа image
  const openImage = NewCard.querySelector('.element__image');
  openImage.addEventListener('click', function () {
    togglePopup(imagePopup);
    bigImageCard.src = cardImage.src;
    titleImageCard.textContent = cardHeading.textContent;
  });

  // Помещаем карточку в контейнер карточек
  CardsContainer.prepend(NewCard);
};

//запуск цикла для создания каждой карточки из массива
initialCards.forEach(createCard);

//обработчик клика по кнопке Сохранить
formEdit.addEventListener('submit', handleFormSubmit);

//удаление карточки
function deleteCardButton(evt) {
  const removeButton = evt.target;
  const removeCard = removeButton.closest('.element');
  removeCard.remove();
}

//emptyPopup
const emptyPopup = document.querySelector('.popup__empty-form');
const buttonEmptyClose = emptyPopup.querySelector(
  '.popup__button_action_close'
);

//открытие попапа добавления
profileAddButton.addEventListener('click', function () {
  togglePopup(emptyPopup);
});

//закрытие попапа добавления
buttonEmptyClose.addEventListener('click', function () {
  togglePopup(emptyPopup);
});

//emptyform
const formEmpty = emptyPopup.querySelector('.popup-form');
formEmpty.addEventListener('submit', addFormCard);

//добавление карточки из формы добавления
function addFormCard(evt) {
  evt.preventDefault();
  const formEmpty = evt.target;
  const placeInput = formEmpty.querySelector('.popup-form__text_type_name');
  const linkInput = formEmpty.querySelector('.popup-form__text_type_additional');
  //запись данных из полей формы добавления в поля карточки
  card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  // Создаем карточку на основе данных
  createCard(card);
  togglePopup(emptyPopup);
}
