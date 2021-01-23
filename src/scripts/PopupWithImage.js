import Popup from './Popup.js';

//попап открытия картинки
export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image-big');
        this._title = this._popup.querySelector('.popup__image-title');
    };

    open(name, link) {
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
    };
};