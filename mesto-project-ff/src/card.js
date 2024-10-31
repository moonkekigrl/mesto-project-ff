import { deleteMyCard, likeCard, removeLike } from "./api";
import { cardTemplate, openImagePopup, openDeletePopup } from "./index.js";

//функция создания карточки и проверки
export function createCard (cardElement, cardTemplate, currentUserId, openImagePopup, openDeletePopup) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const likeButton = cardItem.querySelector('.card__like-button');
    const deleteButton = cardItem.querySelector('.card__delete-button');

    cardImage.src = cardElement.link;
    cardImage.alt = cardElement.name;
    cardItem.querySelector('.card__title').textContent = cardElement.name;
    
    likeButton.dataset.id = cardElement._id;
    likeButton.addEventListener('click', pressLikeButton);

    const likeCounter = cardItem.querySelector('.like-counter');
    const likes = cardElement.likes;
    const likesCount = likes.length;
    likeCounter.textContent = likesCount;

    const myLikes = likes.some((l) => l._id === currentUserId);
    
    if (myLikes) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (cardElement.owner._id !== currentUserId) {
        deleteButton.remove();
    } 
    
    if (cardElement.owner._id === currentUserId) {
    deleteButton.addEventListener('click', () => openDeletePopup( cardElement._id, deleteCard));
    }

    cardItem.querySelector('.card__image').addEventListener('click', openImagePopup);
    return cardItem;
}
    
export function deleteCard(id) {
    return deleteMyCard(id);
}

//функция постановки лайков
function pressLikeButton(evt) {
    const likeButton = evt.target;
    const id = likeButton.dataset.id;
    const likeCounter = likeButton.nextElementSibling;

    if(likeButton.classList.contains('card__like-button_is-active')) {
        console.log(id);
        removeLike(id)
        .then ((data) => {
            likeCounter.textContent = data.likes.length;
            likeButton.classList.remove('card__like-button_is-active');
        })
        .catch((error) => 
        console.error('Ошибка', error));
    }
    else {
        console.log (id)
        likeCard(id)
        .then ((data) => {
            likeCounter.textContent = data.likes.length;
            likeButton.classList.add('card__like-button_is-active');
        })
        .catch((error) =>
        console.error('Ошибка', error));
    }
}
