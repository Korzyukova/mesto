
let nameInput = document.querySelector('.popup__input')
let jobInput = document.querySelector('.popup__input_about')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');


const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__closed');

function togglePopup() {
    popup.classList.toggle('popup_opened');   
}
openPopup.addEventListener('click', togglePopup);

closePopup.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__container');


function formSubmitHandler (evt) {
    console.log('event=', evt)
    evt.preventDefault(); 
    console.log('nameInput=', nameInput);
    console.log('jobInput=', jobInput);


    profileName.textContent = nameInput;

    profileDescription.textContent = jobInput;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 



function toggleHeart(heart) {
    console.log(heart.classList);
    if (heart.classList.contains('photo-grid__heart_active') ){
        heart.classList.remove('photo-grid__heart_active');
    } else {
        heart.classList.add('photo-grid__heart_active');
    }
}