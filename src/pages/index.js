import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
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
const editPopup = document.querySelector('#edit-popup');
const editForm = document.querySelector('#edit-form');

const newTemplateSelector = '#template__el';

const elementsList = document.querySelector('.elements__list');

const addForm = document.querySelector('#add-form');
const buttonOpenPopupAdd = document.querySelector('#open-popup-addButton');
const addPopup = document.querySelector('#add-popup');
const imagePopup = document.querySelector('#photo-popup');


const formAddValidator = new FormValidator (config, addForm);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, editForm);
formEditValidator.enableValidation();

// const closePopupEsc = evt => {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_is-open');
//     closePopup(openedPopup);
//   }
// };

// const closePopupOverlay = evt => {
//   if (evt.currentTarget === evt.target) {
//     const openedPopup = document.querySelector('.popup_is-open');
//     closePopup(openedPopup);
//   }
// };

// function openPopup(popup) {
//   popup.classList.add('popup_is-open');
//   document.addEventListener('keydown', closePopupEsc);
//   popup.addEventListener('mousedown', closePopupOverlay);
// };

// function closePopup(popup) {
//   popup.classList.remove('popup_is-open');
//   document.removeEventListener('keydown', closePopupEsc);
//   popup.removeEventListener('mousedown', closePopupOverlay);
// };

function generateCard(newCard) {
  const card = new Card(newCard, newTemplateSelector, handleCardClick);
  return card.createCard();
}

const cardSection = new Section({
   render:(item) => {
    const cardElement = generateCard(item)
    cardSection.addItem(cardElement);
  }
},elementsList);
cardSection.rendererItems(initialCards);

const viewImage = new PopupWithImage(imagePopup);
viewImage.setEventListeners();

function handleCardClick(place, link) {
  viewImage.open(place, link);
}

// buttonClosePopupImage.addEventListener('click', () => closePopup(imagePopup));
// buttonOpenPopupAdd.addEventListener('click', () => openPopup(addPopup));
// buttonClosePopupAdd.addEventListener('click', () => closePopup(addPopup));

// buttonOpenPopupAdd.addEventListener('click', function () {
//   formAddValidator.disableSubmitButton();
//   openPopup(addPopup);
// });

const formAddPopup = new PopupWithForm(addPopup, handleSubmit);
formAddPopup.setEventListeners();

function handleSubmit(data) {
  cardSection.addItem(generateCard(data));
  console.log(data);
  formAddPopup.close();
}

function openAddPopup() {
  console.log('click');
  formAddValidator.disableSubmitButton();
  formAddPopup.open();
}

buttonOpenPopupAdd.addEventListener('click', openAddPopup)

// addForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   const form = event.target;
//   const formData = new FormData(form);
//   const value = Object.fromEntries(formData);

//   const newCard = {
//     name: value['place'],
//     link: value['link']
//   };

//   elementsList.prepend(generateCard(newCard));
//   form.reset();
//   closePopup(addPopup);
// });

const userInfo = new UserInfo({
  nameProfile: '.profile__title',
  subtitleProfile: '.profile__subtitle'
});

const profileUserInfo = new PopupWithForm(editPopup, submitProfile)
profileUserInfo.setEventListeners();

function submitProfile(data) {
  userInfo.setUserInfo(data);
  profileUserInfo.close();
}

function openProfile() {
  profileUserInfo.open();
  formEditValidator.disableSubmitButton();
  profileUserInfo.setInputValues(userInfo.getUserInfo());
}

buttonOpenPopupProfile.addEventListener('click', () => openProfile());


// buttonOpenPopupProfile.addEventListener('click', function() {
//     openPopup(editPopup);
//     nameInput.value = profileTitle.textContent;
//     fieldInput.value = profileSubtitle.textContent;
// });

// buttonClosePopupProfile.addEventListener('click', function() {
//     closePopup(editPopup);
// });

// editForm.addEventListener('submit', function(event){
//     event.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = fieldInput.value;
//     closePopup(editPopup);
// });
