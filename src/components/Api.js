export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }

            throw new Error('error')
        })
        .catch((error) => {
            console.log(`error`)
        })
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(`error`)
        })
    }

    pathUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about})
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(`error`)
        })
    }

    createCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link})
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(`error`)
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    dislikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('error')
        })
        .catch((error) => {
            console.log(error)
        }) 
    }
}