import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, { handlerFormSubmit } ) {
        super(popup);
        this._form = this._popup.querySelector('.popup__form');
        this._handlerFormSubmit = handlerFormSubmit;
        this._button = this._form.querySelector('.popup__button');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));//выбирает все поля ввода текущего попапа
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset(); //сброс формы
    };

    loadingProgress(text) {
        this._button.textContent = text;
    };
};
