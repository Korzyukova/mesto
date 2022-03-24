

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let placeName = document.querySelector('.popup__input_type_place-name');
let linkName = document.querySelector('.popup__input_type_link');



const popup1 = document.querySelector('#popup1');
const popup2 = document.querySelector('#popup2');
const popup3 = document.querySelector('#popup3');
const openPopup1 = document.querySelector('.profile__edit-button');
const openPopup2 = document.querySelector('.profile__add-button');

const closePopup1 = popup1.querySelector('.popup__closed');
const closePopup2 = popup2.querySelector('.popup__closed');
const closePopup3 = popup3.querySelector('.popup__closed');

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
        let itemX = `<li class="photo-grid__rectangle">
        <img onclick="deleteItem(this)"  src='./images/trash.png'/ class="trash">
        <img class="photo-grid__item" src="${item.link}" alt="${item.name}">
    
        
        <div class="photo-grid__bottom">
            <h2 class="photo-grid__name">${item.name}</h2>
            <button class="photo-grid__heart"></button>
        </div>
        
    </li>`
        container.insertAdjacentHTML('afterbegin', itemX);
    })

    const openPopup3 = document.querySelectorAll('.photo-grid__item');
    openPopup3.forEach(function (item) {
        item.addEventListener('click', () => {
            togglePopup3(item)
        });
    });
}

);

function deleteItem(target) {
    let container = document.querySelector('.photo-grid');
    container.removeChild(target.parentNode)
}

function togglePopup1() {
    popup1.classList.toggle('popup_opened');
}

function togglePopup2() {
    popup2.classList.toggle('popup_opened');
};

function togglePopup3(target) {
    popup3.classList.toggle('popup_opened');

    document.querySelector('.popup__image').src = target.src;
    document.querySelector('.popup__image_name').textContent = target.alt;
}

openPopup1.addEventListener('click', () => {
    togglePopup1()
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
});
openPopup2.addEventListener('click', () => {
    togglePopup2()

    // placeName.value = profileName.textContent
    // linkName.value = profileDescription.textContent
});





closePopup1.addEventListener('click', togglePopup1);
closePopup2.addEventListener('click', togglePopup2);
closePopup3.addEventListener('click', togglePopup3);

let formElement1 = document.querySelector('#form1');
let formElement2 = document.querySelector('#form2');
let formElement3 = document.querySelector('#form3');


function formSubmitHandler1(evt) {
    console.log('event=', evt)
    evt.preventDefault();
    console.log('nameInput=', nameInput);
    console.log('jobInput=', jobInput);




    profileName.textContent = nameInput.value;

    profileDescription.textContent = jobInput.value;

    togglePopup1();
}


function formSubmitHandler2(evt) {
    evt.preventDefault();

    let container = document.querySelector('.photo-grid');
    let itemX = `<li class="photo-grid__rectangle">
        <img class="photo-grid__item" src="${linkName.value}" alt="${placeName.value}">
        <div class="photo-grid__bottom">
            <h2 class="photo-grid__name">${placeName.value}</h2>
            <button class="photo-grid__heart"></button>
        </div>
        <img onclick="deleteItem(this)" src='./images/trash.png' class="trash">
    </li>`;

    container.insertAdjacentHTML('afterbegin', itemX);

    togglePopup2();
}

formElement1.addEventListener('submit', formSubmitHandler1);
formElement2.addEventListener('submit', formSubmitHandler2);



function toggleHeart(heart) {
    console.log(heart.classList);
    if (heart.classList.contains('photo-grid__heart_active')) {
        heart.classList.remove('photo-grid__heart_active');
    } else {
        heart.classList.add('photo-grid__heart_active');
    }
}

