export default class Card {
    constructor(item, templateSelector, openHandler) {

        this._item = item;
        this._templateSelector = templateSelector;
        this.openHandler = openHandler;
    }

    _createClickHandler() {
        this.handle = this.openHandler.bind(this);
        this.card.querySelector('.photo-grid__item').addEventListener('click', () => this.openHandler(this._item));
    }

    generateCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.photo-grid__rectangle');
        this.card = cardTemplate.cloneNode(true);

        const photoGridItem = this.card.querySelector('.photo-grid__item');
        

        photoGridItem.src = this._item.link;
        photoGridItem.alt = this._item.name;
        this.card.querySelector('.photo-grid__name').textContent = this._item.name;

        this._createClickHandler();
        this._createDeleteHandler();
        this._createHeartHandler();

        return this.card
    }
    _createDeleteHandler() {
        this.card.querySelector('.trash').addEventListener('click', this._deleteHandler);
    }
    _deleteHandler(e) {
        e.target.closest('.photo-grid__rectangle').remove();
    }
    _createHeartHandler() {
        this.card.querySelector('.photo-grid__heart').addEventListener('click', this._heartHandler);
    }
    _heartHandler(e) 
   {
        e.target.classList.toggle('photo-grid__heart_active');
   }
}
