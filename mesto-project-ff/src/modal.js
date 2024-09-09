//функции открытия и закрытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('mousedown', closeByEsc);
}

export function closeModal(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByEsc);
}

//функция закрытия через Escape
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
} 
//функция закрытия через оверлэй
function closeByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closeModal(evt.currentTarget)
    }
}
