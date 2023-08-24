export class Section {
    constructor({render}, templateSelector) {
        this._render = render;
        this._templateSelector = templateSelector;
    }

    rendererItems(items) {
        items.forEach(newCard => {
            this._render(newCard);
          });
    }

    addItem(element) {
        this._templateSelector.prepend(element);
    }
}