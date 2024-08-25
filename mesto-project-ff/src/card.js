//функция создания карточки
export function createCard (cardValue, deleteCard, cardTemplate, openImagePopup) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');

    cardImage.src = cardValue.link;
    cardImage.alt = cardValue.name;
    cardItem.querySelector('.card__title').textContent = cardValue.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardItem);
    });

    cardItem.querySelector('.card__like-button').addEventListener('click', likeByClick);
    cardImage.addEventListener('click', () => openImagePopup(cardValue));
    
    return cardItem;
};

//функция удаления карточки
export function deleteCard(cardItem) {
    return cardItem.remove();
}

//обработчик лайка
export function likeByClick(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}