export default class Api {
    constructor(options) {
     this.options = options;
    }
  
    async getInitialCards() {
        return fetch(this.options.baseUrl + '/cards', {
          headers: this.options.headers
        }) 
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    } 


    async getProfile() {
      return fetch(this.options.baseUrl + '/users/me', {
        headers: this.options.headers
      }) 
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  } 


    async postInitialCards(card){
    return fetch (this.options.baseUrl + '/cards', {
  method: 'POST',
  headers: this.options.headers,
  body: JSON.stringify(card)
})
    }
  

  async patchProfile(patchObj){
    return fetch(this.options.baseUrl + '/users/me', {
      method: 'PATCH',
     headers: this.options.headers,
      body: JSON.stringify(patchObj)
  })
}
async unlikeCard(id){
  return fetch(this.options.baseUrl + '/cards/'+id+'/likes ',{
    method: 'DELETE',
    headers: this.options.headers,
    })
}
async likeCard(id){
  return fetch(this.options.baseUrl + '/cards/'+id+'/likes ',{
    method: 'PUT',
    headers: this.options.headers,
    })
}
async unlikeCard(id){
  return fetch(this.options.baseUrl + '/cards/'+id+'/likes ',{
    method: 'DELETE',
    headers: this.options.headers,
    })
}


async deleteCard(id){
  return fetch(this.options.baseUrl + '/cards/'+id ,{
    method: 'DELETE',
    headers: this.options.headers,
    })
}

async patchAvatar(avatar){
  return fetch(this.options.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
   headers: this.options.headers,
    body: JSON.stringify({avatar: avatar})
})


}
}
