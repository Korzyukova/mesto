import './index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Сard.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupImage.js';
import { api, profilePopupOpen, cardPopupOpen, profilePictureEdit, validatorProfile, validatorCard, validatorAvatar } from '../utils/constants.js';


function createCard(item) {
    const card = new Card(item, '#card', openImage, (e) => {
        confirmDeletePopUp.open(e);
    }, api, profileId);
    return card.generateCard();
}



let profileId = "";
let cardsList = null;



Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {

        console.log(userData);
        profileInfo.setUserInfo(userData.name, userData.about, userData.avatar)
        profileId = userData._id;

        cardsList = new Section({
            items: cards,
            renderer: (item) => {
                const card = createCard(item);
                cardsList.addItem(card);
            }
        },
            '.photo-grid'
        );
        cardsList.renderItems();
    })
    .catch((err) => console.error(err));





const profileInfo = new UserInfo('.profile__name', '.profile__description', '.profile__picture-image');

function openImage(item) {
    popUpWithImage.open(item.link, item.name);
}

const popUpWithImage = new PopupWithImage('#imagePopup');
const profilePopUp = new PopupWithForm('#profilePopup', (e) => {
    profilePopUp.renderLoading(true, 'Сохранение...');
    api.patchProfile({
        name: e.name,
        about: e.about
    }).then((data) => {

        profileInfo.setUserInfo(e.name, e.about, null);
        profilePopUp.close();

    }).catch((err) => console.error(err))
        .finally(() => {
            profilePopUp.renderLoading(fasle);
        });;
});


const addCardPopUp = new PopupWithForm('#cardPopup', (e) => {
    addCardPopUp.renderLoading(true, 'Сохранение...');

    api.postInitialCards({
        name: e.name,
        link: e.link
    })
        .then((data) => {
            console.log(data);

            const card = createCard(data);
            cardsList.prependItem(card);
            addCardPopUp.close();
        }).catch((err) => console.error(err))
        .finally(() => {
            addCardPopUp.renderLoading(false);
        });
});


const confirmDeletePopUp = new PopupDelete('#deletePopup', (e) => {
    api.deleteCard(e._id).then((data) => {
        document.getElementById(e._id).remove();

        confirmDeletePopUp.close();
    }).catch((err) => console.error(err));
});

const changeAvatarPopUp = new PopupWithForm('#avatarPopup', (e) => {
    changeAvatarPopUp.renderLoading(true, 'Сохранение...');

    api.patchAvatar(e.link).then((data) => {
        profileInfo.setUserInfo(null, null, e.link);
        changeAvatarPopUp.close();
    }).catch((err) => console.error(err)).
        finally(() => {
            changeAvatarPopUp.renderLoading(false);
        });
});


profilePopupOpen.addEventListener('click', () => {
    profilePopUp.open();
    const userInfo = profileInfo.getUserInfo();
    profilePopUp.setInputValues({ name: userInfo.name, about: userInfo.description });
    validatorProfile.resetValidation();
});

cardPopupOpen.addEventListener('click', () => {
    addCardPopUp.open();
    validatorCard.resetValidation();
});



profilePictureEdit.addEventListener('click', () => {
    changeAvatarPopUp.open();
    validatorAvatar.resetValidation();
});



