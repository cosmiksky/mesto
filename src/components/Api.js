export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json()
        }
        throw new Error('error')
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    pathUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about})
        })
        .then(this._checkResponse)
    }

    createCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link})
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    dislikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse) 
    }
}