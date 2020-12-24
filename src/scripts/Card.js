//создание класса Card
export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    //выбор темплейта
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector) //ищем шаблон 
            .content                            //content это то что внутри тега template
            .querySelector('.element')          //ищем карточку
            .cloneNode(true)                    //клонируем именно карточку

        return cardElement;
    };

    //создание карточки
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImage = this._element.querySelector('.element__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;

        const cardName = this._element.querySelector('.element__title');
        cardName.textContent = this._name;

        return this._element;
    };

    //действия с карточкой
    _deleteCard() {
        this._element.remove();
    };

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_linked');
    };

    //вешаем обработчики событий
    _setEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };
};

