class Api {
  constructor({ address }) {
    this._address = address;
  }

  getAppInfo() { //метод полученя всей информации со стороны сервера
    return Promise.all([this.getUserInfoApi(), this.getCardList()])
  }

  getUserInfoApi() { //метод получения информации о пользователе
    const query = "users/me";

    return this._get(query);
  }

  setUserInfoApi(name, description) { //метод добавления информации пользователя на сервер
    const query = "users/me";

    return this._set(query, "PATCH", {name, about: description});
  }

  setUserAvatarApi(avatar) { //метод добавления аварата на сервер
    const query = "users/me/avatar";

    return this._set(query, "PATCH", avatar);
  }

  getCardList() { //метод получения массива карточек от сервера
    const query = "cards";

     return this._get(query);
  }

  addNewCard({name, link}) { //метода добавления карточки на сервер
    const query = "cards"

    return this._set(query, "POST", {name, link})
  }

  deleteCard(cardId) { //метод удаления карточки на сервере
    const query = `cards/${cardId}`

    return this._delete(query, "DELETE")
  }

  likeCard(cardId) { //метод отправки лайка на сервер
    const query = `cards/${cardId}/likes`

    return this._put(query, "PUT")
  }

  unlikeCard(cardId) { //метод снятия лайка на сервере
    const query = `cards/${cardId}/likes`

    return this._delete(query, "DELETE")
  }

  _put(query, method) { //PUT-запрос на сервер для лайка
    const options = {
      method,
      credentials: 'include'
    }
    return fetch(this._url(query), options)
    .then(this._getResponseData)
  }

  _delete(query, method) { //DELETE запрос для лайка и карточки на сервер
    const options = {
      method,
      credentials: 'include'
    }
    return fetch(this._url(query), options)
    .then(this._getResponseData)
  }

  _get(query) { //GET-запрос для данных от сервера
    const options = {
      credentials: 'include'
    }

    return fetch(this._url(query), options)
    .then(this._getResponseData)
  }

  _set(query, method, body) { //SET-запрос для данных на сервер
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }

    return fetch(this._url(query), options)
      .then(this._getResponseData)
  }

  _url(query) { //создание ссылки для запросов
    return `${this._address}/${query}`
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json().then(j => Promise.resolve(j));
    }
    else {
      return Promise.reject(`${res.status}`);
    }
  }
}

const api = new Api({
  address: "https://mesto.allison.backend.nomoredomains.work"
})
  
export default api