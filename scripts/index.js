

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const placeName = document.querySelector('.popup__input_type_place-name');
const linkName = document.querySelector('.popup__input_type_link');



const profilePopup = document.querySelector('#profilePopup');
const cardPopup = document.querySelector('#cardPopup');
const imagePopup = document.querySelector('#imagePopup');
const openProfilePopup = document.querySelector('.profile__edit-button');
const openCardPopup = document.querySelector('.profile__add-button');

const closeProfilePopup = profilePopup.querySelector('.popup__closed');
const closeCardPopup = cardPopup.querySelector('.popup__closed');
const closeImagePopup = imagePopup.querySelector('.popup__closed-image');

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

    const container = document.querySelector('.photo-grid');

    initialCards.forEach(function (item, index, array) {
        container.insertAdjacentElement('afterbegin', createCard(item.name, item.link));
    })
});

function createCard(name, link)
{
    const card = document.querySelector('#card').content.querySelector('.photo-grid__rectangle').cloneNode(true);

    card.querySelector('.photo-grid__item').src = link;
    card.querySelector('.photo-grid__item').alt = name;
    card.querySelector('.photo-grid__name').textContent = name;

    card.querySelector('.photo-grid__item').addEventListener('click', (item) => {
        document.querySelector('.popup__image').src = link;
        document.querySelector('.popup__image-name').textContent = name;
        openPopup(imagePopup);
    });
    
    return card; 
}

function deleteItem(target) {
    target.closest('.photo-grid__rectangle').remove();
}

function openPopup(popup)
{
    popup.classList.toggle('popup_opened');
}

function closePopup(popup)
{
    popup.classList.toggle('popup_opened');
}


openProfilePopup.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
});
openCardPopup.addEventListener('click', () => {
    
    openPopup(cardPopup);
});



closeProfilePopup.addEventListener('click', function() {closePopup(profilePopup)});
closeCardPopup.addEventListener('click', function() {closePopup(cardPopup)});
closeImagePopup.addEventListener('click', function() {closePopup(imagePopup)});

const formElement1 = document.querySelector('#form1');
const formElement2 = document.querySelector('#form2');
const formElement3 = document.querySelector('#form3');


function formSubmitHandler1(evt) {
    console.log('event=', evt)
    evt.preventDefault();
    console.log('nameInput=', nameInput);
    console.log('jobInput=', jobInput);




    profileName.textContent = nameInput.value;

    profileDescription.textContent = jobInput.value;

    closePopup(profilePopup);
}


function formSubmitHandler2(evt) {
    evt.preventDefault();
    let container = document.querySelector('.photo-grid');
    container.insertAdjacentElement('afterbegin', createCard(placeName.value, linkName.value));
    closePopup(cardPopup);
    linkName.value = '';
    placeName.value = '';
}

formElement1.addEventListener('submit', formSubmitHandler1);
formElement2.addEventListener('submit', formSubmitHandler2);



function toggleHeart(heart) {

    heart.classList.toggle('photo-grid__heart_active');

}

