const openPopupButton = document.querySelector('#open-popup-editButton');
const closePopupButton = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const pageTitle = document.querySelector('.page__title');
const nameInput = document.querySelector('#name-input');
const pageSubtitle = document.querySelector('.page__subtitle');
const fieldInput = document.querySelector('#field-input');
const editForm = document.querySelector('#edit-form');
const likeButton = document.querySelectorAll('.element__group');



openPopupButton.addEventListener('click', function() {
    openPopup(editPopup);
});

closePopupButton.addEventListener('click', function() {
    closePopup(editPopup);
});

nameInput.value = pageTitle.textContent;
fieldInput.value = pageSubtitle.textContent;

editForm.addEventListener('submit', function(event){
    event.preventDefault();
    pageTitle.textContent = nameInput.value;
    pageSubtitle.textContent = fieldInput.value;
    closePopup(editPopup);
});

function openPopup(popup) {
    popup.classList.add('popup_is-open');
};

function closePopup(popup) {
    popup.classList.remove('popup_is-open');
};

likeButton.addEventListener('click', function(){
    likeButton.classList.add('element__group_active');
});
