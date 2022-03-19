

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let placeNameInput = document.querySelector('.popup__input_type_place-name');
let 

const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__closed');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

document.addEventListener("DOMContentLoaded", () => {

    let container = document.querySelector('.photo-grid');

    initialCards.forEach(function (item, index, array) {
        let itemX = `<li class="photo-grid__rectangle" id="item_${index}">
        <img class="photo-grid__item" src="${item.link}" alt="Старая церковь в горах">
        <div class="photo-grid__bottom">
            <h2 class="photo-grid__name">${item.name}</h2>
            <button class="photo-grid__heart"></button>
        </div>
        <div onclick="deleteItem(${index})">DELETE</div>
    </li>`
            container.insertAdjacentHTML('afterbegin', itemX);
    })

}

);

function deleteItem(index)
{
    let item = document.querySelector('#item_' + index);
    let container = document.querySelector('.photo-grid');
    container.removeChild(item)
}

function togglePopup() {
    popup.classList.toggle('popup_opened');
}


openPopup.addEventListener('click', () => {
    togglePopup()
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
});


closePopup.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__container');


function formSubmitHandler(evt) {
    console.log('event=', evt)
    evt.preventDefault();
    console.log('nameInput=', nameInput);
    console.log('jobInput=', jobInput);




    profileName.textContent = nameInput.value;

    profileDescription.textContent = jobInput.value;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);



function toggleHeart(heart) {
    console.log(heart.classList);
    if (heart.classList.contains('photo-grid__heart_active')) {
        heart.classList.remove('photo-grid__heart_active');
    } else {
        heart.classList.add('photo-grid__heart_active');
    }
}

