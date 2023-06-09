const buttonOpenPopupProfile = document.querySelector('#open-popup-editButton');
const buttonClosePopupProfile = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('#name-input');
const profileSubtitle = document.querySelector('.profile__subtitle');
const fieldInput = document.querySelector('#field-input');
const editForm = document.querySelector('#edit-form');

const template = document.querySelector('#template__el');
const templateContent = template.content;
const elementItem = templateContent.querySelector('.element');
const elementsList = document.querySelector('.elements__list');
const addForm = document.querySelector('#add-form');
const buttonOpenPopupAdd = document.querySelector('#open-popup-addButton');
const addPopup = document.querySelector('#add-popup');
const buttonClosePopupAdd = document.querySelector('#close-popup-button-add');
const inputPlace = template.querySelector('#place-input');
const inputLink = template.querySelector('#link-input');
const buttonOpenPopupImg = document.querySelector('#photo-popup');
const buttonClosePopupImage = document.querySelector('#close-popup-button-img');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

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

function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('mousedown', closePopupOverlay);
};

initialCards.forEach(function(newCard){
    const newElementItem = createCard(newCard);
    elementsList.prepend(newElementItem);
});

function createCard(newCard){
    const newElementItem = elementItem.cloneNode(true);
    const titleElement = newElementItem.querySelector('.element__title');
    titleElement.textContent = newCard.name;
    const imageCard = newElementItem.querySelector('.element__mask-group');
    imageCard.src = newCard.link;
    imageCard.alt = newCard.name;
    const likeButton = newElementItem.querySelector('.element__group');
    const deleteButton = newElementItem.querySelector('.element__trash');
    likeButton.addEventListener ('click', function(event) {
      event.target.classList.toggle('element__group_active');
    });
    deleteButton.addEventListener('click', function(evt) {
      evt.target.closest('.element').remove();
    });
    imageCard.setAttribute('alt',newCard.name);
    imageCard.addEventListener('click', function() {
      popupImage.src = imageCard.src;
      popupCaption.textContent = titleElement.textContent;
      openPopup(buttonOpenPopupImg);
    });

    return newElementItem;
};

buttonOpenPopupImg.addEventListener('click', () => closePopupOverlay(buttonOpenPopupImg));
buttonClosePopupImage.addEventListener('click', () => closePopup(buttonOpenPopupImg));
// buttonOpenPopupAdd.addEventListener('click', () => openPopup(addPopup));
buttonClosePopupAdd.addEventListener('click', () => closePopup(addPopup));

popupAddButton = document.querySelector('.popup__save-button_add');

buttonOpenPopupAdd.addEventListener('click', function () {
  const inputList = Array.from(addForm.querySelectorAll('.popup__input'));
  const validityForm = inputList.every(function (input) {
    return input.validity.valid;
  });
  if (!validityForm) {
    popupAddButton.classList.add('popup__save-button_disabled');
    popupAddButton.setAttribute('disabled', 'true');
  }
  openPopup(addPopup);
});


addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const card = Object.fromEntries(formData);

  const newCard = {
    name: card['place'],
    link: card['link']
  };

  const newElementItem = createCard(newCard);
  elementsList.prepend(newElementItem);
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
