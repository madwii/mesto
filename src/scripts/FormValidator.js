export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__input_state_invalid',
    buttonInvalidClass: 'popup__button_invalid'
};

export class FormValidator {
    constructor(form, validationConfig) {
        this._config = validationConfig;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {//запускает валидацию
        //отменяет отправку формы
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
        // this._setButtonState(); //правильное состояние кнопки. вызываем состояние, соответствующее валидности кнопки
    };

    _setEventListeners() {
        this._setButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState();

            });
        });
    };

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    };


    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    };

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputInvalidClass);
    };

    resetValidationState() {
        this._inputList.forEach((input) => {
            this._hideError(input);
        });
    };

    _deactiveInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    };


    _setButtonState() {
        if (this._deactiveInput(this._inputList)) {
            this._submitButton.classList.add(this._config.buttonInvalidClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.buttonInvalidClass);
            this._submitButton.disabled = false;
        };
    };

};