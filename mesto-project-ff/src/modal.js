//функции открытия и закрытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('mousedown', closeByEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByEsc);
}

//функция закрытия через Escape
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
        }
}

//функция закрытия через оверлэй
function closeByOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closeModal(evt.currentTarget)
    }
}
