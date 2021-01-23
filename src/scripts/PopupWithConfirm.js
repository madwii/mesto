import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._btnConfirm = this._popup.querySelector(".popup__button");
  }

  setEventListeners() {
    this._btnConfirm.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleConfirm();
      this.close();
    });
    super.setEventListeners();
  }

  сonfirmHandler(turn) {
    this._handleConfirm = turn;
  }

  open() {
    super.open();
  }
}