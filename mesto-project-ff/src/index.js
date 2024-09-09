import './pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, deleteCard } from './card.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const profilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button'); 
const newCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileEditForm = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardName = newCardForm.querySelector('.popup__input_type_card-name');
const cardImage = newCardForm.querySelector('.popup__input_type_url');
const cardPopupImage = imagePopup.querySelector('.popup__image');
const cardPopupName = imagePopup.querySelector('.popup__caption');


//редактирование данных профиля
function handleProfileForm(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    
    closeModal(profilePopup);
    profileEditForm.reset();
}
profileEditForm.addEventListener('submit', handleProfileForm);

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
})

//добавление новых карточек
function handleCardForm(evt) {
    evt.preventDefault();

    const cardInfo = {
        name: cardName.value,
        link: cardImage.value
    };
    const newCard = createCard(
        cardInfo,
        deleteCard,
        cardTemplate,
        openImagePopup
    );
    cardsContainer.prepend (newCard);
    
    closeModal(newCardPopup);
    newCardForm.reset();
}
newCardForm.addEventListener('submit', handleCardForm);

addNewCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
})

//открытие карточек
export function openImagePopup(cardValue) {
    cardPopupImage.src = cardValue.link;
    cardPopupImage.alt = cardValue.name;
    cardPopupName.textContent = cardValue.name;

    openModal(imagePopup);
}

//вывод готовых карточек на страницу
initialCards.forEach((cardItem) => {
    cardsContainer.appendChild(
        createCard(cardItem, deleteCard, cardTemplate, openImagePopup)
    );
});

//закрытие крестиком
function setCloseListeners() {
     document.querySelectorAll('.popup__close').forEach((button) => {
         button.addEventListener('click', () => {
         const openPopup = document.querySelector('.popup_is-opened');
            closeModal(openPopup);
            })
     });
    } 
setCloseListeners();