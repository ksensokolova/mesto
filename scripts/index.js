let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");
let profileEditButton = document.querySelector(".profile__edit-btn");
let popup = document.querySelector(".popup");
let popupContainer = document.querySelector("popup__container");
let buttonClose = document.querySelector(".popup__button_action_close");

let nameInput = document.querySelector(".edit-form__text_type_name");
let jobInput = document.querySelector(".edit-form__text_type_occupation");
let formElement = document.querySelector(".edit-form");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup();
}

profileEditButton.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);
