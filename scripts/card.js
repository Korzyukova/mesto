  export default class Card {
    constructor(name, link, template){
        this.name = name;
        this.link = link;
 
        const cardTemplate = document.querySelector(template).content.querySelector('.photo-grid__rectangle');
        
 
        this.card = cardTemplate.cloneNode(true);
        this.card.querySelector('.photo-grid__item').src = link;
        this.card.querySelector('.photo-grid__item').alt = name;
        this.card.querySelector('.photo-grid__name').textContent = name;
        
        this._createClickHandler();
        this._createDeleteHandler();
        this._createHeartHandler();
    }

    _createClickHandler()
    {
        const popupImage  = document.querySelector('.popup__image');
        const imageName = document.querySelector('.popup__image-name');
        const imagePopup = document.querySelector('#imagePopup');
     this.card.querySelector('.photo-grid__item').addEventListener('click', this._clickHandler);
     document.addEventListener('keydown', (e)=> {if (e.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }});
    }
    
    _clickHandler(item)
    {
        
        popupImage.src = this.link;
        popupImage.alt = this.name;
         imageName.textContent = this.name;
         
         imagePopup.classList.add('popup_opened');
    }
 
    _createDeleteHandler()
    {
     this.card.querySelector('.trash').addEventListener('click', (e) => {
         e.target.closest('.photo-grid__rectangle').remove();
     });
    }
    _createHeartHandler()
    {
     this.card.querySelector('.photo-grid__heart').addEventListener('click', (e) => {
         e.target.classList.toggle('photo-grid__heart_active');
     });
    }
 
    getCard()
    {
        return this.card;
    }
 }
