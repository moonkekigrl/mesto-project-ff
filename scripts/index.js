const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

function addCard (cardValue) {
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

cardItem.querySelector('.card__image').src = cardValue.link;
cardItem.querySelector('.card__title').textContent = cardValue.name;

const deleteButton = cardItem.querySelector('.card__delete-button');
deleteButton.addEventListener('click', () => {
    cardItem.remove();
    });

return cardItem;
};

function renderCards() {
    initialCards.forEach(function(cardValue) {
        cardsContainer.append(addCard(cardValue));
    });
};
renderCards();