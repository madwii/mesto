import './index.css';
import Card from '../scripts/Card.js';
import Api from '../scripts/Api.js';
import Section from '../scripts/Section.js';
import { FormValidator, validationConfig } from '../scripts/FormValidator.js';
import {
  elements,
  userAvatarBtn,
  userEditBtn,
  userAddBtn,
  popupAvatar,
  popupEdit,
  popupAdd,
  popupImage,
  popupConfirm,
  inputName,
  inputAbout,
  userAvatar,
  userName,
  userAbout
} from '../utils/constants.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithConfirm from '../scripts/PopupWithConfirm.js';
import UserInfo from '../scripts/UserInfo.js';

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  userId: '486f4cfdd86508efc4a3eb06',
  headers: {
    authorization: '1d464b43-9695-4331-8a3a-49b913826759',
    'Content-Type': 'application/json'
  }
}

export const profileConfig = {
  name: userName,
  about: userAbout,
  avatar: userAvatar
}

const api = new Api(apiConfig);
const myId = api.userId;
const user = new UserInfo(profileConfig);

Promise.all([api.getUserData(),
  api.getInitialCards()])
  .then(([userData, result]) => {
    user.setUserInfo(userData);
    cardList.renderCards(result);
  })
  .catch((err) => console.log(err));


//валидация
const popupFormEditValidator = new FormValidator(popupEdit, validationConfig);
popupFormEditValidator.enableValidation();
const popupFormAddValidator = new FormValidator(popupAdd, validationConfig);
popupFormAddValidator.enableValidation();
const popupFormAvatarValidator = new FormValidator(popupAvatar, validationConfig);
popupFormAvatarValidator.enableValidation();

const popupWithConfirm = new PopupWithConfirm(popupConfirm);
const popupWithImage = new PopupWithImage(popupImage);

// отрисовка элементов.. массив
const cardList = new Section({ renderer: (item) => renderCards(item) }, elements);


function renderCards(item) {
  const card = new Card(item, "#element-template", myId, {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    handleConfirmClick: () => {
      popupWithConfirm.open();
      popupWithConfirm.сonfirmHandler(() => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLikeClick: () => {
      api
        .likeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeThatCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDislike: () => {
      api
        .dislikeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeThatCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  cardList.addItem(card.generateCard());
};

//смена имени пользователя
const popupEditProfile = new PopupWithForm(popupEdit, {
  handlerFormSubmit: (item) => {
    popupEditProfile.loadingProgress('Сохранение...')
    api
      .setUserData(item)
      .then((result) => {
        user.setUserInfo(result);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.loadingProgress('Сохранить')
      })
  },
});

//добавление карточки
const popupAddCard = new PopupWithForm(popupAdd, {
  handlerFormSubmit: (item) => {
    popupAddCard.loadingProgress('Сохранение...')
    api
      .createCard(item)
      .then((item) => {
        renderCards(item);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.loadingProgress('Создать')
      })
  },
});

//смена аватарки
const popupChangeAvatar = new PopupWithForm(popupAvatar, {
  handlerFormSubmit: (item) => {
    popupChangeAvatar.loadingProgress('Сохранение...')
    api
      .changeAvatar(item)
      .then((data) => {
        user.setUserAvatar(data);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeAvatar.loadingProgress('Сохранить')
      })
  },
});

userEditBtn.addEventListener("click", () => {
  const bioUser = user.getUserInfo();
  inputName.value = bioUser.name;
  inputAbout.value = bioUser.about;

  popupEditProfile.open();
  popupFormEditValidator.resetValidationState();
});

userAddBtn.addEventListener("click", () => {
  popupAddCard.open();
  popupFormAddValidator.resetValidationState();
});

userAvatarBtn.addEventListener("click", () => {
  popupChangeAvatar.open();
  popupFormAvatarValidator.resetValidationState();
});

popupChangeAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirm.setEventListeners();