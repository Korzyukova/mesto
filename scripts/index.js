const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__closed');

function togglePopup() {
    popup.classList.toggle('popup__opened');   
}
openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__container');


function formSubmitHandler (evt) {
    console.log('event=', evt)
    evt.preventDefault(); 
    let nameInput = document.querySelector('.popup__input').value;
    console.log('nameInput=', nameInput);
    let jobInput = document.querySelector('.popup__input_about').value;
    console.log('jobInput=', jobInput);

    let profileName = document.querySelector('.profile__name');
    profileName.textContent = nameInput;
    
    let profileDescription = document.querySelector('.profile__description');
    profileDescription.textContent = jobInput;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

let heartElements = document.querySelectorAll('.photo-grid__heart');
for (let heart of heartElements) {
    heart.addEventListener('click', function heartCickHandler () {
        toggleHeart(heart)
    })
}

function toggleHeart(heart) {
    console.log(heart.classList);
    if (heart.classList.contains('activeHeart') ){
        heart.classList.remove('activeHeart');
    } else {
        heart.classList.add('activeHeart');
    }
}