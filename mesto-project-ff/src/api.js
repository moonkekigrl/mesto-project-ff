const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: '83e8ca7a-343f-424e-93f1-c8a338dc0e63',
      'Content-Type': 'application/json'
    }
}

//проверка
function resCheck(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//данные пользователя
export function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(resCheck)
}

//редактирование профиля
export function updateProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        
        body: JSON.stringify({
            name: name,
            about: about,
      }),
    })
    .then(resCheck);
}

//загрузка карточек
export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(resCheck)
    .then((cardsData) => {
        return cardsData;
    });
}

//отображение карточек
export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    })
    .then(resCheck);
}

//постановка лайка
export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(resCheck);
}

//удаление лайка
export function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(resCheck);
}

//удаление карточки
export function deleteCurrentUsersCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(resCheck);
}

//изменение аватара
export function changeAvatar(avatarURL) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        
        body: JSON.stringify({
            avatar: avatarURL,
        }),
    })
    .then(resCheck);
}