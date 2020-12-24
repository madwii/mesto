//управление попами
export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    //открыть попап
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    //закрыть попап
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
    //закрытие по Esc
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        };
    };

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
        this._popup.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) {
                return;
            }
            this.close();
        });
    };

};
