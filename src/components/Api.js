export default class Api {
  constructor(options) {
    this.options = options;
  }

  async getInitialCards() {
    return fetch(this.options.baseUrl + '/cards', {
      headers: this.options.headers
    })
      .then(res => { return this._checkResponse(res) });
  }


  async getProfile() {
    return fetch(this.options.baseUrl + '/users/me', {
      headers: this.options.headers
    })
      .then(res => { return this._checkResponse(res) });
  }


  async postInitialCards(card) {
    return fetch(this.options.baseUrl + '/cards', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(card)
    }).then(res => { return this._checkResponse(res) });
  }


  async patchProfile(patchObj) {
    return fetch(this.options.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify(patchObj)
    }).then(res => { return this._checkResponse(res) });
  }
  async unlikeCard(id) {
    return fetch(this.options.baseUrl + '/cards/' + id + '/likes ', {
      method: 'DELETE',
      headers: this.options.headers,
    }).then(res => { return this._checkResponse(res) });
  }
  async likeCard(id) {
    return fetch(this.options.baseUrl + '/cards/' + id + '/likes ', {
      method: 'PUT',
      headers: this.options.headers,
    }).then(res => { return this._checkResponse(res) });
  }
  async unlikeCard(id) {
    return fetch(this.options.baseUrl + '/cards/' + id + '/likes ', {
      method: 'DELETE',
      headers: this.options.headers,
    }).then(res => { return this._checkResponse(res) });
  }


  async deleteCard(id) {
    return fetch(this.options.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this.options.headers,
    }).then(res => { return this._checkResponse(res) });
  }

  async patchAvatar(avatar) {
    return fetch(this.options.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({ avatar: avatar })
    }).then(res => { return this._checkResponse(res) });


  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}
