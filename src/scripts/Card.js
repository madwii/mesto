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

        const cardImgName = this._card.querySelector(".element__title");
        const cardImgLink = this._card.querySelector(".element__image");
        const cardCountLike = this._card.querySelector(".element__like_counter");

        cardImgName.textContent = this._name;
        cardImgLink.src = this._link;
        cardImgLink.alt = this._name;
        cardCountLike.textContent = `${this._likes.length}`;

        if (this._likes.find((like) => like._id === this._myId)) {
            this._card.querySelector(".element__like").classList.add("element__like_linked");
        }

        if (!(this._owner._id === this._myId)) {
            this._card.querySelector('.element__delete').classList.add('element__delete_active');
        }

        this._setEventListeners();

        return this._card;
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    likeThatCard() {
        this._card.querySelector('.element__like').classList.toggle('element__like_linked');
    };

    _Liked() {
        const userLike = this._card.querySelector(".element__like");
        if (userLike.classList.contains("element__like_linked")) {
            this._handleDislike();
        } else {
            this._handleLikeClick();
        }
        // console.log(userLike)
    }

    likeCounter(likes) {
        const likeValue = this._card.querySelector(".element__like_counter");
        likeValue.textContent = likes.length;
    }

    _setEventListeners() {
        this._cardImage = this._card.querySelector(".element__image");
        this._likeCard = this._card.querySelector(".element__like");
        this._deleteCard = this._card.querySelector(".element__delete");
        this._cardImage.addEventListener("click", () => this._handleCardClick());
        this._likeCard.addEventListener("click", () => this._Liked());
        this._deleteCard.addEventListener("click", () => this._handleConfirmClick(this._card));
    }
}