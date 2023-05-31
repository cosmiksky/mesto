const openPopupButton = document.querySelector('#open-popup-editButton');
const closePopupButton = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('#name-input');
const profileSubtitle = document.querySelector('.profile__subtitle');
const fieldInput = document.querySelector('#field-input');
const editForm = document.querySelector('#edit-form');

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

const template = document.querySelector('#template__el');
const templateContent = template.content;
const elementItem = templateContent.querySelector('.element');
const elementsList = document.querySelector('.elements__list');
const addForm = document.querySelector('#add-form');
const openPopupAdd = document.querySelector('#open-popup-addButton');
const addPopup = document.querySelector('#add-popup');
const closeButtonAdd = document.querySelector('#close-popup-button-add');

initialCards.forEach(function(item){
    const newElementItem = createCard(item);
    elementsList.prepend(newElementItem);
});

function createCard(item){
    const newElementItem = elementItem.cloneNode(true);
    const titleElement = newElementItem.querySelector('.element__title');
    titleElement.textContent = item.name;
    const imageCard = newElementItem.querySelector('.element__mask-group');
    imageCard.src = item.link;
    const likeButton = newElementItem.querySelector('.element__group');
    const deleteButton = newElementItem.querySelector('.element__trash');
    likeButton.addEventListener ('click', function(event) {
      event.target.classList.toggle('element__group_active');
    });
    deleteButton.addEventListener('click', function(evt) {
      evt.target.closest('.element').remove();
    });

    return newElementItem;
};

openPopupAdd.addEventListener('click', () => openPopup(addPopup));
closeButtonAdd.addEventListener('click', () => closePopup(addPopup));

addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const valueCard = values['place'];
  const valueImg = values['link'];

  const newElementItem = createCard(valueCard,valueImg);
  elementsList.prepend(newElementItem);
  form.reset();
});

openPopupButton.addEventListener('click', function() {
    openPopup(editPopup);
    nameInput.value = profileTitle.textContent;
    fieldInput.value = profileSubtitle.textContent;
});

closePopupButton.addEventListener('click', function() {
    closePopup(editPopup);
});

editForm.addEventListener('submit', function(event){
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = fieldInput.value;
    closePopup(editPopup);
});

function openPopup(popup) {
    popup.classList.add('popup_is-open');
};

function closePopup(popup) {
    popup.classList.remove('popup_is-open');
};
