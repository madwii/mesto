
// объявление переменных

// const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const elements = document.querySelector(".elements");
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__info');
const elementTemplate = '.element-template';

const popupEdit = document.querySelector('.popup_type_edit');
const edditButton = document.querySelector('.profile__edit-button');
// const editCloseButton = popupEdit.querySelector('.popup__close');

const formProfile = popupEdit.querySelector('.popup__form');
const nameField = popupEdit.querySelector('.popup__input_type_name');  // получить информацию о себе при открытии попапа
const aboutField = popupEdit.querySelector('.popup__input_type_title');

const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = popupAdd.querySelector('.popup__close');

const formAddCard = popupAdd.querySelector('.popup__form');
const cardNameInput = popupAdd.querySelector('.popup__input_type_add');
const cardImageInput = popupAdd.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup_type_image');
const popupImageBig = popupImage.querySelector('.popup__image-big');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
// const imageCloseButton = popupImage.querySelector('.popup__close');

export {
    popups,
    elements,
    name,
    about,
    elementTemplate,
    popupEdit,
    edditButton,
    formProfile,
    nameField,
    aboutField,
    popupAdd,
    addButton,
    addCloseButton,
    formAddCard,
    cardNameInput,
    cardImageInput,
    popupImage,
    popupImageBig,
    popupImageTitle
}