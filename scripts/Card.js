import {openPopup} from './index.js';

export const buttonOpenPopupImg = document.querySelector('#photo-popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export class Card {
  constructor(data,templateSelector) {
    this._titleEl = data.name;
    this._imgCard = data.link;
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
    this._element.querySelector('.element__mask-group').src = this._imgCard;
    this._element.querySelector('.element__mask-group').alt = this._titleEl;

    return this._element;
  }

  _handleLike() {
    this._element.querySelector('.element__group').classList.toggle('element__group_active')
  }

  _handleDelete() {
    this._element.remove()
  }

  _setEventListeners() {
    this._element.querySelector('.element__group').addEventListener('click', () => {
      this._handleLike()
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDelete()
    });

    const imgPopup = this._element.querySelector('.element__mask-group');
    imgPopup.addEventListener('click', function () {
            openPopup(buttonOpenPopupImg);

            popupImage.src = imgPopup.src;
            popupImage.alt = imgPopup.alt;

            popupCaption.textContent = imgPopup.alt;
        });
  }
}