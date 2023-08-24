import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(templateSelector) {
        super(templateSelector);
        this._popupImage = this._templateSelector.querySelector('.popup__image');
        this._popupCaption = this._templateSelector.querySelector('.popup__caption');
    }

    open(name, link) {
        super.open();
        console.log(name,link)
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
    }
}