//функции открытия и закрытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByEsc);
}

//функция закрытия с esc
function closeByEsc(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openedPopup)
    }
} 
//функция закрытия через оверлэй
function closeByOverlay(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.currentTarget === evt.target) {
        closeModal(evt.currentTarget)
    }
}

//закрытие крестиком
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', () => {
    const openPopup = document.querySelector('.popup_is-opened');
       closeModal(openPopup);
       })
});