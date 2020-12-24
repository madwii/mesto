//класс Section, который отвечает за отрисовку элементов на странице

export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    };

    renderer() {
        this._items.reverse().forEach(item => {//первый элемент массива становится последним, а последний — первым.
            this._renderer(item);
        });
    };

    addItem(item) {
        this._container.prepend(item);
    };
};