export class UserInfo {
    constructor({nameProfile, subtitleProfile, avatarProfile}) {
        this._nameProfile = document.querySelector(nameProfile);
        this._subtitleProfile = document.querySelector(subtitleProfile);
        this._avatarProfile = document.querySelector(avatarProfile);
    }

    getUserInfo() {
        const values = {
            name: this._nameProfile.textContent,
            about: this._subtitleProfile.textContent,
            avatar: this._avatarProfile.src
        }
        return values
    }

    setUserInfo(data) {
        this._nameProfile.textContent = data.name;
        this._subtitleProfile.textContent = data.about;
        this._avatarProfile.src = data.avatar;
        this._userId = data._id
    }

    returnUserId() {
        return this._userId
      }
}