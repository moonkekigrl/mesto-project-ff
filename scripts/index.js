const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardValue, deleteCardEvent) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image').src = cardValue.link;
    cardItem.querySelector('.card__image').alt = cardValue.name;
    cardItem.querySelector('.card__title').textContent = cardValue.name;
    

    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
     cardItem.remove(deleteCardEvent);
     });
    
return cardItem;
};

function renderCards() {
    initialCards.forEach(function(cardValue) {
        cardsContainer.append(createCard(cardValue));
    });
};
renderCards();