import Api from '../components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
      authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c',
      'Content-Type': 'application/json'
    }
  }); 
export default class Card {
    constructor(item, templateSelector, openHandler, deleteConfirmHandler) {

        this._item = item;
        this._templateSelector = templateSelector;
        this.openHandler = openHandler;
        this.deleteConfirmHandler = deleteConfirmHandler;
    }

    _createClickHandler() {
        this.handle = this.openHandler.bind(this);
        this.card.querySelector('.photo-grid__item').addEventListener('click', () => this.openHandler(this._item));
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__rectangle');
        this.card = cardTemplate.cloneNode(true);

        this.card.id= this._item._id;
    
        const photoGridItem = this.card.querySelector('.photo-grid__item');

        
        photoGridItem.src = this._item.link;
        photoGridItem.alt = this._item.name;

        this.card.querySelector('.photo-grid__likes').textContent = this._item.likes.length;

        this.card.querySelector('.photo-grid__name').textContent = this._item.name;
        
        if (this._item.likes.some(a => a._id === "164a10abb1243aa6d6c68131"))
            this.card.querySelector('.photo-grid__heart').classList.add('photo-grid__heart_active');

            if (this._item.owner._id=== "164a10abb1243aa6d6c68131")
            {
                this._createDeleteHandler();
            }
            else
            {
                this.card.querySelector('.trash').style.visibility = "hidden";
            }

        this._createClickHandler();        
        this._createHeartHandler();

        return this.card
    }
    _createDeleteHandler() {
        this.card.querySelector('.trash').addEventListener('click', this._deleteHandler.bind(this));
    }
    _deleteHandler(e) {
        
        
        this.deleteConfirmHandler(this._item);
    }
    _createHeartHandler() {

        this.card.querySelector('.photo-grid__heart').addEventListener('click', this._heartHandler.bind(this));
    }

    _heartHandler(e) {
        console.log(this.card);
        if (this.card.querySelector('.photo-grid__heart').classList.contains('photo-grid__heart_active')) {
            //unlike
            // fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards/'+this._item._id+'/likes ', {
            //     method: 'DELETE',
            //     headers: {
            //         authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c'
            //     }
            // })
            api.unlikeCard(this._item._id)
                .then(res => res.json())
                .then((result) => {                    
                    this.card.querySelector('.photo-grid__likes').textContent = result.likes.length;
                    this.card.querySelector('.photo-grid__heart').classList.remove('photo-grid__heart_active');
                    console.log(result);
                });
        }        
        else {
            //like   
            api.likeCard(this._item._id)
            // fetch('https://mesto.nomoreparties.co/v1/cohort-50/cards/'+this._item._id+'/likes ', {
            //     method: 'PUT',
            //     headers: {
            //         authorization: '89e085ba-8b41-4418-bfe4-446f5ffbea9c'
            //     }
            // })
                .then(res => res.json())
                .then((result) => {
                    
                    this.card.querySelector('.photo-grid__likes').textContent = result.likes.length;
                    this.card.querySelector('.photo-grid__heart').classList.add('photo-grid__heart_active');
                    console.log(result);
                });
        }
        

    }
}
