// const popupImage = document.querySelector('.popup__image');
// const popupCaption = document.querySelector('.popup__caption');

export class Card {
  constructor(data,templateSelector,handleCardClick) {
    this._titleEl = data.name;
    this._imgCard = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardEl = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true)

    return cardEl;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._titleEl;

    const cardImage = this._element.querySelector('.element__mask-group');
    cardImage.src = this._imgCard;
    cardImage.alt = this._titleEl;

    this._likeButton = this._element.querySelector('.element__group');
    this._likeButton.addEventListener('click', () => {
      this._handleLike()
    });

    this._deleteButton = this._element.querySelector('.element__trash');
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete()
    });

    return this._element;
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__group_active')
  }

  _handleDelete() {
    this._element.remove()
  }

  _setEventListeners() {
    const imgPopup = this._element.querySelector('.element__mask-group');
    imgPopup.addEventListener('click', () => {
            this._handleCardClick({ name: this._titleEl, link: this._imgCard })
        });
  }
}