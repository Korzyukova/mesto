
export default class Section {
    constructor ({items, renderer}, containerSelector){
      //debugger;
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
   
    addItem(card) {      
      this._container.append(card);
    }
    
    prependItem(card) {
      this._container.prepend(card);
    }

    clear(){
        this._container.innerHTML = '';
    }

    renderItems() {
        this.clear();
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
      }
    }