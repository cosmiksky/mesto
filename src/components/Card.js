export class Card { 
  constructor(data,userId,newTemplateSelector,handleCardClick,openPopupConfirm,{likeCard, dislikeCard}) { 
    this._name = data.name; 
    this._link = data.link; 
    this._like = data.likes;
    this.cardId = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._openPopupConfirm = openPopupConfirm;
    this._handleCardClick = handleCardClick;
    this._dislikeCard = dislikeCard;
    this._likeCard = likeCard;
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

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._likeButton = this._element.querySelector('.element__group');
    this._countLike = this._element.querySelector('.element__like');
    this._countLike.textContent = this._like.length;
    if (this._like.some(data => data._id === this._userId)) {
      this._handleLike()
    }

    this._deleteButton = this._element.querySelector('.element__trash');

    if (this._owner !== this._userId) {
        this._deleteButton.remove()
    }

    this._setEventListeners(); 
 
    return this._element; 
  } 

  updateLikes(data) {
    this._likes = data.likes;
    this._countLike.textContent = this._likes.length;
    this._handleLike();
  }

  _handleLikeCard() {
    if (this._likeButton.classList.contains('element__group_active')) {
      this._dislikeCard(this.cardId)
    } else
     {
      this._likeCard(this.cardId)
    }
  }
 
  _handleLike() { 
    this._likeButton.classList.toggle('element__group_active') 
  } 
 
  handleDelete() { 
    this._element.remove() 
  } 
 
  _setEventListeners() { 
    this._cardImage.addEventListener('click', () => { 
            this._handleCardClick(this._name, this._link) 
        });
    this._likeButton.addEventListener('click', () => { 
          this._handleLikeCard() 
        }); 
    this._deleteButton.addEventListener('click', () => { 
          this._openPopupConfirm.open(this)
        });  
  } 
}