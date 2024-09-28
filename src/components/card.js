import * as Api from './api.js'

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

  likeElement.addEventListener("click", async () => await likeOrUnLikeCard(cardData._id, userId, likeElement, likeCount));
  deleteButton.addEventListener("click", async () => await deleteCard(cardItem, cardData._id));
  img.addEventListener("click", () => handlers.previewCard(cardData)); 

  cardItem.querySelector(".card__title").textContent = cardData.name;

  img.src = cardData.link;
  img.alt = cardData.name;

  return cardItem;
}

const deleteCard = async (card, cardId) => {
  const deleteInfo = await Api.deleteCard(cardId)

  if (deleteInfo){
    card.remove();
  }
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

const likeOrUnLikeCard = async (cardId, userId, likeElement, likeCount) => {
  let cardInfo = undefined;
  if (likeElement.classList.contains("card__like-button_is-active")){
    cardInfo = await Api.unlikeCard(cardId);
  }
  else {
    cardInfo = await Api.likeCard(cardId);
  }

  if (cardInfo) {
    updateLikeInfo(cardInfo, userId, likeElement, likeCount);
  }
};

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