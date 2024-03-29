//массив карточек, которые добавляются в elements
 export const initialCards = [
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

export const config = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__text',
  submitButtonSelector: '.popup-form__submit-btn',
  errorClass: 'popup-form__text_type_error',
  errorEnabledClass: 'popup-form__input-error_active',
  buttonDisabledClass: 'popup-form__submit-btn_type_disabled',
};
