const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: '14e09f40-ae65-4e03-a003-ecf8c1e066e9',
      'Content-Type': 'application/json'
    }
  };

const checkResponseAndReturnPromise = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const handleErrorResponse = (error) => {
    console.log(error);
}
  
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};


export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};

export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(checkResponseAndReturnPromise)
    .catch(handleErrorResponse)
};