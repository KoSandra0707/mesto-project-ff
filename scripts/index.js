const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const deleteCard = (event) => {
    placesList.removeChild(event.currentTarget.parentElement);
}

const createTemplateCard = (parameter) => {
    const cardItem = template.querySelector(".card").cloneNode(true); 

    cardItem.querySelector(".card__delete-button").addEventListener("click", parameter.deleteCard)
    cardItem.querySelector(".card__title").textContent = parameter.name;
    const img = cardItem.querySelector(".card__image");

    img.src = parameter.url;
    img.alt = parameter.name;

    return cardItem;
}

const createCard = (parameter) => {
    const card = createTemplateCard(parameter);

    placesList.appendChild(card);
}

const initialCard = () => initialCards.forEach((x) => {
    createCard({name: x.name, url: x.link, deleteCard: deleteCard });
})

initialCard();