 
export default class Card {
    constructor(item, templateSelector, openHandler, deleteConfirmHandler, api, profileId) {

        this._item = item;
        this._templateSelector = templateSelector;
        this.openHandler = openHandler;
        this.deleteConfirmHandler = deleteConfirmHandler;
        this.api = api;
        this.profileId = profileId;
    }

    _setEventListeners() {
        this.handle = this.openHandler.bind(this);
        this.card.querySelector('.photo-grid__item').addEventListener('click', () => this.openHandler(this._item));
        
        if (this._item.owner._id=== this.profileId)
            {
                this.card.querySelector('.trash').addEventListener('click', this._deleteHandler.bind(this));
            }
            else
            {
                this.card.querySelector('.trash').style.visibility = "hidden";
            }
        
            this._heartButton.addEventListener('click', this._heartHandler.bind(this));
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__rectangle');
        this.card = cardTemplate.cloneNode(true);

        this.card.id= this._item._id;
    
        const photoGridItem = this.card.querySelector('.photo-grid__item');

        this._heartButton = this.card.querySelector('.photo-grid__heart');
        this._heartCounter = this.card.querySelector('.photo-grid__likes');

        
        photoGridItem.src = this._item.link;
        photoGridItem.alt = this._item.name;

        this._heartCounter.textContent = this._item.likes.length;

        this.card.querySelector('.photo-grid__name').textContent = this._item.name;
        
        if (this._item.likes.some(a => a._id === this.profileId))
        this._heartButton.classList.add('photo-grid__heart_active');

            

        this._setEventListeners();        
        

        return this.card
    }
    
    _deleteHandler(e) {
        this.deleteConfirmHandler(this._item);
    }
    

    _heartHandler(e) {
        
        if (this._heartButton.classList.contains('photo-grid__heart_active')) {
            this.api.unlikeCard(this._item._id)
                .then((result) => {                    
                    this._heartCounter.textContent = result.likes.length;
                    this._heartButton.classList.remove('photo-grid__heart_active');
                });
        }        
        else {
            this.api.likeCard(this._item._id)
                .then((result) => {
                    
                    this._heartCounter.textContent = result.likes.length;
                    this._heartButton.classList.add('photo-grid__heart_active');
                });
        }
        

    }
}
