import {Card, buttonOpenPopupImg} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const buttonOpenPopupProfile = document.querySelector('#open-popup-editButton');
const buttonClosePopupProfile = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('#name-input');
const profileSubtitle = document.querySelector('.profile__subtitle');
const fieldInput = document.querySelector('#field-input');
const editForm = document.querySelector('#edit-form');

const templateSelector = '#template__el';
// const templateContent = template.content;
// const elementItem = templateContent.querySelector('.element');
const elementsList = document.querySelector('.elements__list');
const addForm = document.querySelector('#add-form');
const buttonOpenPopupAdd = document.querySelector('#open-popup-addButton');
const addPopup = document.querySelector('#add-popup');
const buttonClosePopupAdd = document.querySelector('#close-popup-button-add');
// const inputPlace = template.querySelector('#place-input');
// const inputLink = template.querySelector('#link-input');

const buttonClosePopupImage = document.querySelector('#close-popup-button-img');
// const buttonOpenPopupImg = document.querySelector('#photo-popup');
// const popupImage = document.querySelector('.popup__image');
// const popupCaption = document.querySelector('.popup__caption');

const popupAddButton = document.querySelector('.popup__save-button_add');

const formAddValidator = new FormValidator (config, addForm);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, editForm);
formEditValidator.enableValidation();

const closePopupEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-open');
    closePopup(openedPopup);
  }
};

const closePopupOverlay = evt => {
  if (evt.currentTarget === evt.target) {
    const openedPopup = document.querySelector('.popup_is-open');
    closePopup(openedPopup);
  }
};

export function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('mousedown', closePopupOverlay);
};

function generateCard(newCard) {
  const card = new Card(newCard, templateSelector);
  return card.createCard();
}

initialCards.forEach((newCard) => {
    // const card = new Card(newCard, templateSelector);
    // const cardElement = card.createCard();
    elementsList.prepend(generateCard(newCard));
});

buttonOpenPopupImg.addEventListener('click', () => closePopupOverlay(buttonOpenPopupImg));
buttonClosePopupImage.addEventListener('click', () => closePopup(buttonOpenPopupImg));
buttonOpenPopupAdd.addEventListener('click', () => openPopup(addPopup));
buttonClosePopupAdd.addEventListener('click', () => closePopup(addPopup));

buttonOpenPopupAdd.addEventListener('click', function () {
  openPopup(addPopup);
});


addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const value = Object.fromEntries(formData);

  const newCard = {
    name: value['place'],
    link: value['link']
  };

  // const card = new Card(newCard, templateSelector);
  // const cardElement = card.createCard();
  elementsList.prepend(generateCard(newCard));
  form.reset();
  closePopup(addPopup);
});

buttonOpenPopupProfile.addEventListener('click', function() {
    openPopup(editPopup);
    nameInput.value = profileTitle.textContent;
    fieldInput.value = profileSubtitle.textContent;
});

buttonClosePopupProfile.addEventListener('click', function() {
    closePopup(editPopup);
});

editForm.addEventListener('submit', function(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = fieldInput.value;
    closePopup(editPopup);
});
