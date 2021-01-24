//класс Section, который отвечает за отрисовку элементов на странице

export default class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;

    };

    renderCards(items) {
        items.reverse().forEach(item => {//первый элемент массива становится последним, а последний — первым.
            this._renderer(item);
        });
    };

    addItem(item) {
        console.log(this._container);
        this._container.prepend(item);
    };
};