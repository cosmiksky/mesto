export class UserInfo {
    constructor({nameProfile, subtitleProfile}) {
        this._nameProfile = document.querySelector(nameProfile);
        this._subtitleProfile = document.querySelector(subtitleProfile);
    }

    getUserInfo() {
        const values = {
            nickname: this._nameProfile.textContent,
            job: this._subtitleProfile.textContent
        }
        return values
    }

    setUserInfo(data) {
        this._nameProfile.textContent = data.nickname;
        this._subtitleProfile.textContent = data.job;
    }
}