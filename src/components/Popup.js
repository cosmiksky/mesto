export class Popup {
    constructor(templateSelector) {
        this._templateSelector = templateSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._buttonClose = document.querySelector('.popup__close-button');
    }

    open() {
        this._templateSelector.classList.add('popup_is-open');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._templateSelector.classList.remove('popup_is-open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = evt => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = evt => {
        if (evt.target ===  this._templateSelector) {
            this.close()
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => { this.close()});
        
        document.addEventListener('mousedown', this._handleOverlayClose);
    }
}