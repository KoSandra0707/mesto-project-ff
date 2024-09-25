const createTemplateCard = (templateCard, cardData, handlers) => {    
  const cardItem = templateCard.cloneNode(true); 
  const likeElement = cardItem.querySelector(".card__like-button")
  const img = cardItem.querySelector(".card__image");

  likeElement.addEventListener("click", () => handlers.likeCard(likeElement));
  cardItem.querySelector(".card__delete-button").addEventListener("click", () => handlers.deleteCard(cardItem));
  cardItem.querySelector(".card__image").addEventListener("click", () => handlers.previewCard(cardData));
  cardItem.querySelector(".card__title").textContent = cardData.name;

  img.src = cardData.link;
  img.alt = cardData.name;

  return cardItem;
}

const deleteCard = (card) => {
  card.remove();
}

const createCard = (placesList, templateCard, cardData, handlers, firstInList = false) => {
  const card = createTemplateCard(templateCard, cardData, handlers);

  if (firstInList){
    placesList.prepend(card);
  }
  else{
    placesList.appendChild(card);
  }
}

export { deleteCard, createCard }