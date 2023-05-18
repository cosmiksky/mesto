const openPopupButton = document.querySelector('#open-popup-editButton');
const closePopupButton = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('#name-input');
const profileSubtitle = document.querySelector('.profile__subtitle');
const fieldInput = document.querySelector('#field-input');
const editForm = document.querySelector('#edit-form');



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
