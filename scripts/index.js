const template = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const deleteCard = (card) => {
    card.remove();
}

const createTemplateCard = (cardData, handlers) => {    
    const cardItem = template.querySelector(".card").cloneNode(true); 

    cardItem.querySelector(".card__delete-button").addEventListener("click", () => handlers.deleteCard(cardItem))
    cardItem.querySelector(".card__title").textContent = cardData.name;
    const img = cardItem.querySelector(".card__image");

    img.src = cardData.link;
    img.alt = cardData.name;

    return cardItem;
}

const createCard = (cardData, handlers) => {
    const card = createTemplateCard(cardData, handlers);

    placesList.appendChild(card);
}

const initialCard = () => initialCards.forEach((cardData) => {
    createCard(cardData, { deleteCard: deleteCard });
})

initialCard();