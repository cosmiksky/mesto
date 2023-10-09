export class Popup {
    constructor(templateSelector) {
        this._popup = document.querySelector(templateSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_is-open');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_is-open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = evt => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = evt => {
        if (evt.target ===  this._popup) {
            this.close()
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => { this.close()});
        
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }
}