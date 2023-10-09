import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { config, buttonOpenPopupProfile, editPopup, editForm, newTemplateSelector, elementsList, addForm, buttonOpenPopupAdd, addPopup, imagePopup, deletePopup, popupAvatar, btnAvatar } from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    "Content-Type": 'application/json',
    "authorization": '6775605d-b4a4-476d-b389-d6886e4c5f23'
  }
})

Promise.all([api.getAllCards(), api.getUserInfo()])
  .then(([resCards, resUser]) => {
    console.log([resCards, resUser]);
    userId = resUser._id;
    cardSection.rendererItems(resCards);
    userInfo.setUserInfo(resUser, userId)
  })
  .catch(() => {
    console.error
  })


// api.getAllCards()
// .then((data) => {
//   console.log(data);
//   cardSection.rendererItems(data)
// })


const formAddValidator = new FormValidator (config, addForm);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(config, editForm);
formEditValidator.enableValidation();

const popupWithConfirmation = new PopupWithConfirmation(deletePopup, handleDeleteCard);
popupWithConfirmation.setEventListeners();

function handleDeleteCard(data) {
  console.log(data.cardId)
  popupWithConfirmation.renderLoading(true, 'Удаление...')
  api.deleteCard(data.cardId)
  .then(() => {
    data.handleDelete();
    popupWithConfirmation.close();
 })
  .catch(() => {
    console.error
  })
  .finally(() => {
    popupWithConfirmation.renderLoading(false)
  })
}

let userId = '';

function generateCard(data) {
  const card = new Card(data, userId, newTemplateSelector, handleCardClick, popupWithConfirmation,
     {likeCard: (cardId) => {
    api.likeCard(cardId)
  .then((data) => {
    card.updateLikes(data)
  })
  },
    
  dislikeCard: (cardId) => {
    api.dislikeCard(cardId)
  .then((data) => {
    card.updateLikes(data)
  })
  }
});
  return card.createCard();
}

const cardSection = new Section({
   render:(item) => {
    const cardElement = generateCard(item)
    cardSection.addItem(cardElement); 
  }
},elementsList);

const viewImage = new PopupWithImage(imagePopup);
viewImage.setEventListeners();

function handleCardClick(name, link) {
  viewImage.open(name, link);
}

const formAddPopup = new PopupWithForm(addPopup, handleSubmit, popupWithConfirmation);
formAddPopup.setEventListeners();

function handleSubmit(data) {
  console.log(data)
  formAddPopup.renderLoading(true, 'Сохранение...')
  api.createCard(data)
  .then((data) => {
    cardSection.addItem(generateCard(data));
    formAddPopup.close()
  })
  .catch(() => {
    console.error
  })
  //cardSection.addItem(generateCard(data));
  //console.log(data);
  //formAddPopup.close();

  .finally(() => {
    formAddPopup.renderLoading(false)
  })
}

function openAddPopup() {
  console.log('click');
  formAddValidator.disableSubmitButton();
  formAddPopup.open();
}

buttonOpenPopupAdd.addEventListener('click', openAddPopup)

const profileUserInfo = new PopupWithForm(editPopup, submitProfile)
profileUserInfo.setEventListeners();

const userInfo = new UserInfo({
  nameProfile: '.profile__title',
  subtitleProfile: '.profile__subtitle',
  avatarProfile: '.profile__image'
});

function submitProfile(data) {
  profileUserInfo.renderLoading(true, 'Сохранение...')
  api.pathUserInfo(data)
  .then(data => userInfo.setUserInfo(data))
  .then(() => profileUserInfo.close())
  .catch(() => {
    console.error
  })
  // userInfo.setUserInfo(data);
  // profileUserInfo.close();
  .finally(() => {
    profileUserInfo.renderLoading(false)
  })
}

function openProfile() {
  profileUserInfo.open();
  profileUserInfo.setInputValues(userInfo.getUserInfo());
}

buttonOpenPopupProfile.addEventListener('click', () => openProfile());

const editPopupAvatar = new PopupWithForm(popupAvatar, handleSubmitAvatar);
editPopupAvatar.setEventListeners();

function handleSubmitAvatar(data) {
  editPopupAvatar.renderLoading(true, 'Сохранение...')
  api.changeAvatar(data)
  .then((res) => {
    userInfo.setUserInfo(res)
    editPopupAvatar.close()
  })
  .catch(() => {
    console.error
  })
  .finally(() => {
    editPopupAvatar.renderLoading(false)
  })
}

btnAvatar.addEventListener('click', () => {
  validPopupAvatar.disableSubmitButton();
  editPopupAvatar.open()
})

const validPopupAvatar = new FormValidator(config, popupAvatar)
validPopupAvatar.enableValidation()
