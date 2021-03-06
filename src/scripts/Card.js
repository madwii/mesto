//создание класса Card
export default class Card {
    constructor(data, templateCard, myId, { handleCardClick, handleConfirmClick, handleLikeClick, handleDislike }) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._myId = myId;
        this._owner = data.owner;
        this._likes = data.likes;
        this._template = templateCard;
        this._handleCardClick = handleCardClick;
        this._handleConfirmClick = handleConfirmClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDislike = handleDislike;
    }

    //выбор темплейта
    _getTemplate() {
        return document
            .querySelector(this._template)//ищем шаблон 
            .content//content это то что внутри тега template
            .querySelector(".element")//ищем карточку
            .cloneNode(true);//клонируем именно карточку
    }

    generateCard() {
        this._card = this._getTemplate();

        this._cardImage = this._card.querySelector(".element__image");
        this._cardImgName = this._card.querySelector(".element__title");
        this._likeCard = this._card.querySelector(".element__like");
        this._deleteCard = this._card.querySelector(".element__delete");
        this._cardCountLike = this._card.querySelector(".element__like_counter");

        this._cardImgName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardCountLike.textContent = `${this._likes.length}`;

        if (this._likes.find((like) => like._id === this._myId)) {
            this._likeCard.classList.add("element__like_linked");
        }

        if (!(this._owner._id === this._myId)) {
            this._deleteCard.classList.add('element__delete_active');
        }

        this._setEventListeners();

        return this._card;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    likeThatCard() {
        this._likeCard.classList.toggle('element__like_linked');
    };

    _Liked() {
        if (this._likeCard.classList.contains("element__like_linked")) {
            this._handleDislike();
        } else {
            this._handleLikeClick();
        }
        // console.log(this._likeCard)
    }

    likeCounter(likes) {
        this._cardCountLike.textContent = likes.length;
    }

    _setEventListeners() {
        this._cardImage.addEventListener("click", () => this._handleCardClick());
        this._likeCard.addEventListener("click", () => this._Liked());
        this._deleteCard.addEventListener("click", () => this._handleConfirmClick(this._card));
    }
}