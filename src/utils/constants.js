// объявление переменных
export const elements = document.querySelector('.elements');

//кнопки попапов
export const userAvatarBtn = document.querySelector('.profile__image_change');
export const userEditBtn = document.querySelector('.profile__edit-button');
export const userAddBtn = document.querySelector('.profile__add-button');

//попапы
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const popupConfirm = document.querySelector('.popup_confirm');

//поля юзера
export const inputName = popupEdit.querySelector(".popup__input_type_name");
export const inputAbout = popupEdit.querySelector(".popup__input_type_title");

//стоковые поля
export const userAvatar = document.querySelector('.profile__image');
export const userName = document.querySelector('.profile__name');
export const userAbout = document.querySelector('.profile__info');

//поля валидации
export const formAvatar = popupAvatar.querySelector('.popup__form');
export const formEdit = popupEdit.querySelector('.popup__form');
export const formAdd = popupAdd.querySelector('.popup__form');

