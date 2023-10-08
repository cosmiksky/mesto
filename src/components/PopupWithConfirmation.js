import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
constructor( templateSelector, deleteCard) {
        super(templateSelector);
        this._deleteCard = deleteCard;
        this._confirmButton = document.querySelector('#agree-delete');
        this._templateSelector = templateSelector;
    }

    open(cardId) {
      super.open();
      this._cardId = cardId;
    }

    renderLoading(loading, newText) {
      if (!this._confirmButton) return

       if (loading) {
       this._defaultText = this._confirmButton.textContent
       this._confirmButton.textContent = newText
       } else {
       this._confirmButton.textContent = this._defaultText
      }
     }

    setEventListeners() {
        super.setEventListeners()
        this._confirmButton.addEventListener('click', (evt) => {
          this._deleteCard(this._cardId)
        })
      }
}