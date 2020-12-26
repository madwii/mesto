//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
    constructor({ user, description }) {
        this._user = user;
        this._description = description;
    };

    getUserInfo() {
        return {
            name: this._user.textContent,
            info: this._description.textContent
        };
    };

    setUserInfo({ name, info }) {
        this._user.textContent = name;
        this._description.textContent = info;
    };
};