const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(cardItem) {
    cardItem.remove();
}

function createCard (cardValue, deleteCardEvent) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = cardValue.link;
    cardImage.alt = cardValue.name;
    cardItem.querySelector('.card__title').textContent = cardValue.name;
    
    cardItem.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardItem);
    });
    
    return cardItem;
};

function renderCards() {
    initialCards.forEach(function(cardValue, deleteCard) {
        cardsContainer.append(createCard(cardValue, deleteCard));
    });
};
renderCards();