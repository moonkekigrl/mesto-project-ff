import './vendor/fonts.css';
import './vendor/normalize.css';
import './pages/index.css';
import {createCard, deleteCard} from './card.js';
import { openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import { getCards, getUserData, updateProfile, changeAvatar, addCard } from './api.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const cardPopupImage = imagePopup.querySelector('.popup__image');
const cardPopupName = imagePopup.querySelector('.popup__caption');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupCloseButton = newCardPopup.querySelector('.popup__close');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.popup_type_new-avatar');
const avatarPopupCloseButton = profileAvatar.querySelector('.popup__close');
const profileEditForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const newAvatarForm = document.forms['avatar-edit'];
const nameInput = profileEditForm.elements.name;
const jobInput = profileEditForm.elements.description;
const cardName = newCardForm.elements['place-name']
const cardImage = newCardForm.elements.link;
const avatarImage = newCardForm.querySelector('.popup__input_type_url');

let currentUserId;

//promise
function fetchData() {
    Promise.all([getUserData(), getCards()])
        .then(([userData, cardsData]) => {
            currentUserId = userData._id;

            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            profileImage.style.backgroundImage = `url(${userData.avatar})`;

            // Вывести карточки на страницу
            cardsData.forEach((cardElement) => {
                cardsContainer.appendChild(
                    createCard(cardElement, cardTemplate, currentUserId, openImagePopup, deleteCard)
            );
        })
    })
        .catch(error => console.error('Ошибка загрузки данных', error));
};
fetchData();

//редактирование данные профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profilePopup, validationConfig);
    openModal(profilePopup);
})

function handleProfileForm(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = jobInput.value;

    renderLoading(true, profilePopup.querySelector('.popup__button'));
    updateProfile(newName, newDescription)
    .then ((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(profilePopup);
    })
    .catch((error) => {
        console.error('Ошибка обновления данных', error);
    })
    .finally(() => {
        renderLoading(false, profilePopup.querySelector('.popup__button'));
    })
}

profileEditForm.addEventListener('submit', handleProfileForm);
profilePopupCloseButton.addEventListener('click', () => {
    profileEditForm.reset();
    closeModal(profilePopup);
})

//создание карточек
function handleCardForm(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardName.value,
        link: cardImage.value
    };

    renderLoading(true, newCardForm.querySelector('.popup__button'));
    addCard(newCard.name, newCard.link)
    .then((card) => {
        cardsContainer.prepend(
            createCard(
            card,
            cardTemplate,
            currentUserId,
            openImagePopup,
            deleteCard
            ));
            newCardForm.reset();
            clearValidation(newCardPopup, validationConfig);
            closeModal(newCardPopup);
        })
        .catch((error) => {
            console.error('Ошибка', error);
        })
        .finally(() => {
            renderLoading(false, newCardForm.querySelector('.popup__button'));
        })
}

newCardForm.addEventListener('submit', handleCardForm);
addNewCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
})

newCardPopupCloseButton.addEventListener('click', () => {
    newCardForm.reset();
    clearValidation(newCardPopup, validationConfig);
    closeModal(newCardPopup);
})

//изменение аватара
function updateAvatar(evt) {
    evt.preventDefault();

    const newAvatar = avatarImage.value;
    profileImage.style.backgroundImage = newAvatar;
    renderLoading(true, profileAvatar.querySelector('.popup__button'));
    changeAvatar(newAvatar)
        .then((res) => {
            profileImage.style.backgroundImage = `url('${res.avatar}')`;
            newAvatarForm.reset();

            clearValidation(newAvatarForm, validationConfig);
            closeModal(profileAvatar);
        })
        .catch((error) => {
            console.error('Ошибка загрузки изображения аватара', error);
        })
        .finally(() => {
            renderLoading(false, profileAvatar.querySelector('.popup__button'));
        });
}

newAvatarForm.addEventListener('submit', updateAvatar);
profileImage.addEventListener('click', () => {
    openModal(profileAvatar);
});

avatarPopupCloseButton.addEventListener('click', () => {
    closeModal(profileAvatar);
    clearValidation(newAvatarForm, validationConfig);
    newAvatarForm.reset();
});

//попап с картинкой
export function openImagePopup(evt) {
    const popupImage = evt.target;
  
    cardPopupImage.src = popupImage.src;
    cardPopupImage.alt = popupImage.alt;
    cardPopupName.textContent = popupImage.alt;

    openModal(imagePopup);
}

imagePopupCloseButton.addEventListener('click', () => {
    closeModal(imagePopup);
});


//загрузка
function renderLoading(saving, button) {
    if (saving) {
        button.textContent = 'Сохранение…';
    } else {
        button.textContent = 'Сохранить';
    }
}

//валидация
const validationConfig = {
    formList: '.popup__form',
    inputList: '.popup__input',
    buttonElement: '.popup__button',
    buttonElementDisabled: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};


enableValidation(validationConfig);


