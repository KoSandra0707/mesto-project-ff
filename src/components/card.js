const createTemplateCard = (templateCard, cardData, userId, handlers) => {    
  const cardItem = templateCard.cloneNode(true); 
  const likeElement = cardItem.querySelector(".card__like-button")
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const img = cardItem.querySelector(".card__image");
  const likeCount = cardItem.querySelector(".card__like-count");

  if (cardData.owner._id !== userId){
    deleteButton.classList.add("card__delete-button-hide");
  }

  updateLikeInfo(cardData, userId, likeElement, likeCount);

  likeElement.addEventListener("click", async () => await handlers.likeCard(cardData._id, userId, likeElement, likeCount, updateLikeInfo));
  deleteButton.addEventListener("click", async () => await handlers.deleteCard(cardItem, cardData._id));
  img.addEventListener("click", () => handlers.previewCard(cardData)); 

  cardItem.querySelector(".card__title").textContent = cardData.name;

  img.src = cardData.link;
  img.alt = cardData.name;

  return cardItem;
}

const createCard = (placesList, templateCard, cardData, userId, handlers, firstInList = false) => {
  const card = createTemplateCard(templateCard, cardData, userId, handlers);

  if (firstInList){
    placesList.prepend(card);
  }
  else{
    placesList.appendChild(card);
  }
}

const updateLikeInfo = (cardData, userId, likeElement, likeCount) => {
  if (checkLikeUser(cardData, userId)){
    likeElement.classList.add("card__like-button_is-active")
  }
  else {
    likeElement.classList.remove("card__like-button_is-active")
  }

  likeCount.textContent = cardData.likes.length;
}

const checkLikeUser = (cardData, userId) => cardData.likes.some(like => like["_id"] === userId)

export { createCard }