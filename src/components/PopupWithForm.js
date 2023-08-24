import {Popup} from './Popup';

export class PopupWithForm extends Popup {
constructor(templateSelector, handleSubmit) {
        super(templateSelector);
        this._handleSubmit = handleSubmit;
        this._formPopup = this._templateSelector.querySelector('.popup__form');
        this._inputList = this._formPopup.querySelectorAll('.popup__input');
    }

    close() {
        super.close();
        this._formPopup.reset();
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }
}