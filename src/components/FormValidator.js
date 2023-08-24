export class FormValidator {
  constructor(config, formElement) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
       this._showInputError(inputElement, inputElement.validationMessage)}
      else 
       {this._hideInputError(inputElement);}
  }

  _enableSubmitButton() {
    this.buttonElement.classList.remove(this.inactiveButtonClass);
    this.buttonElement.removeAttribute('disabled');
  }

  disableSubmitButton() {
    this.buttonElement.classList.add(this.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
       this.disableSubmitButton()} else {
       this._enableSubmitButton();
      }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this.inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
}