import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(templateSelector) {
        super(templateSelector);
        this._popupImage = this._templateSelector.querySelector('.popup__image');
        this._popupCaption = this._templateSelector.querySelector('.popup__caption');
    }

    open(place, link) {
        super.open();
        console.log(place,link)
        this._popupImage.src = link;
        this._popupImage.alt = place;
        this._popupCaption.textContent = place;
    }
}