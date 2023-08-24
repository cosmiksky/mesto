export class Card { 
  constructor(data,newTemplateSelector,handleCardClick) { 
    this._place = data.place; 
    this._link = data.link; 
    this._handleCardClick = handleCardClick; 
    this._newTemplateSelector = newTemplateSelector; 
  } 
 
  _getTemplate() { 
    const cardEl = document 
    .querySelector(this._newTemplateSelector) 
    .content 
    .querySelector('.element') 
    .cloneNode(true) 
 
    return cardEl; 
  } 
 
  createCard() { 
    this._element = this._getTemplate();   

    this._cardName = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__mask-group');

    this._cardName.textContent = this._place;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;

    this._likeButton = this._element.querySelector('.element__group');

    this._deleteButton = this._element.querySelector('.element__trash');

    this._setEventListeners(); 
 
    return this._element; 
  } 
 
  _handleLike() { 
    this._likeButton.classList.toggle('element__group_active') 
  } 
 
  _handleDelete() { 
    this._element.remove() 
  } 
 
  _setEventListeners() { 
    this._cardImage.addEventListener('click', () => { 
            this._handleCardClick(this._place, this._link) 
        });
    this._likeButton.addEventListener('click', () => { 
          this._handleLike() 
        }); 
    this._deleteButton.addEventListener('click', () => { 
          this._handleDelete() 
        });  
  } 
}