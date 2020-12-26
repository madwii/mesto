import './index.css';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import { FormValidator, validationConfig } from '../scripts/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import {
  elements,
  name,
  about,
  elementTemplate,
  popupEdit,
  edditButton,
  nameField,
  aboutField,
  popupAdd,
  addButton,
  popupImage
} from '../utils/constants.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';

const popupFormEditValidator = new FormValidator(popupEdit, validationConfig);
popupFormEditValidator.enableValidation();
const popupFormAddValidator = new FormValidator(popupAdd, validationConfig);
popupFormAddValidator.enableValidation();

// отрисовка элементов, изначальный массив
const addNewCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addNewCard.addItem(createCard(item));
    },
  },
  elements
);
addNewCard.renderer();

function createCard(item) {//вынос в отдельную функцию создание карточки. она будет возвращать готовую карточку, для последующей вставки в DOM
  const card = new Card(item, elementTemplate, handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const user = new UserInfo({
  user: name,
  description: about
});

const popupWithImage = new PopupWithImage(popupImage);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};


const popupHandleEdit = new PopupWithForm(popupEdit, (item) => {
  console.log(item);
  user.setUserInfo({ name: item['name'], info: item['about'] });
  popupHandleEdit.close();
});

const popupHandleAdd = new PopupWithForm(popupAdd, (data) => {
  addNewCard.addItem(createCard(data));
  popupHandleAdd.close();
  // console.log(data);
});

edditButton.addEventListener('click', () => {
  popupHandleEdit.open();
  const userInfo = user.getUserInfo();
  nameField.value = userInfo.name;
  aboutField.value = userInfo.info;
});

addButton.addEventListener('click', () => {
  popupHandleAdd.open();
  popupFormAddValidator.resetValidationState();//задает состояние кнопки при открытии попапа
});

//слушатели
popupWithImage.setEventListeners();
popupHandleEdit.setEventListeners();
popupHandleAdd.setEventListeners();