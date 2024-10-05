import './pages/index.css';
import { createCard } from './components/card.js'
import { setDataForm, clearForm, renderLoadingFormWithOperationAsync } from './components/form.js'
import * as Modal from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import * as Api from './components/api.js'

const templateCard = document.querySelector("#card-template").content.querySelector(".card");
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const editAvatarForm = document.forms["edit-avatar"];
const popupTypeImage = document.querySelector(".popup_type_image");
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card")
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const imgPopUp = popupTypeImage.querySelector(".popup__image");
const caption = popupTypeImage.querySelector(".popup__caption");
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarEditButton = document.querySelector(".profile__avatar-edit-button");
const initialCards = await Api.getInitialCards()
.catch(Api.baseHandleErrorResponse);
let userInfo = undefined;

const setUserInfo = (name, about, avatar) => {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
}

const updateUserInfo = async () => {
  userInfo = await Api.getUserInfo()
  .catch(Api.baseHandleErrorResponse);
  setUserInfo(userInfo.name, userInfo.about, userInfo.avatar);
}

await updateUserInfo()
.catch(Api.baseHandleErrorResponse);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

enableValidation(validationConfig);

const previewCard = (cardData) => {
  imgPopUp.src = cardData.link;
  imgPopUp.alt = cardData.name;
  caption.textContent = cardData.name;

  Modal.show(popupTypeImage);
}

const handleProfileFormSubmit = async (e) => {
  e.preventDefault();

  await renderLoadingFormWithOperationAsync(e.currentTarget, async () => {
    const updateUserInfo = await Api.updateUserInfo(editProfileForm.elements.name.value, editProfileForm.elements.description.value)
    .catch(Api.baseHandleErrorResponse);
    setUserInfo(updateUserInfo.name, updateUserInfo.about, updateUserInfo.avatar);
  });
  Modal.close(editProfilePopup);
};

const handleAvatarFormSubmit = async (e) => {
  e.preventDefault();

  await renderLoadingFormWithOperationAsync(e.currentTarget, async () => {
    const updateUserInfo = await Api.updateAvatar(editAvatarForm.elements.avatar.value)
    .catch(Api.baseHandleErrorResponse);
    setUserInfo(updateUserInfo.name, updateUserInfo.about, updateUserInfo.avatar);
  })
  Modal.close(popupEditAvatar);
};

const likeCard = async (cardId, userId, likeElement, likeCount, updateLikeInfo) => {
  let cardInfo = undefined;
  if (likeElement.classList.contains("card__like-button_is-active")){
    cardInfo = await Api.unlikeCard(cardId)
    .catch(Api.baseHandleErrorResponse);
  }
  else {
    cardInfo = await Api.likeCard(cardId)
    .catch(Api.baseHandleErrorResponse);
  }

  if (cardInfo) {
    updateLikeInfo(cardInfo, userId, likeElement, likeCount);
  }
};

const deleteCard = async (card, cardId) => {
  const deleteInfo = await Api.deleteCard(cardId)
  .catch(Api.baseHandleErrorResponse);

  if (deleteInfo){
    card.remove();
  }
}

const handleCardFormSubmit = async (e) => {
  e.preventDefault();
  const name = newPlaceForm.elements["place-name"].value;
  const link = newPlaceForm.elements["link"].value;
  let cardData = undefined;

  await renderLoadingFormWithOperationAsync(e.currentTarget, async () => {
    cardData = await Api.addCard(name, link)
    .catch(Api.baseHandleErrorResponse);

    createCard(placesList, templateCard, cardData, userInfo._id, { previewCard: previewCard, likeCard: likeCard, deleteCard: deleteCard }, true);
  })
  
  Modal.close(popupNewCard);
  clearForm(newPlaceForm);
};

const renderCards = () => initialCards.forEach((cardData) => {
    createCard(placesList, templateCard, cardData, userInfo._id, { previewCard: previewCard, likeCard: likeCard, deleteCard: deleteCard });
});

profileEditButton.addEventListener("click", () => {
  setDataForm(editProfileForm, {
    name: userInfo.name,
    description: userInfo.about
  });
  Modal.show(editProfilePopup);
  clearValidation(editProfileForm, validationConfig)
});

profileAddButton.addEventListener("click", () => {
  clearForm(newPlaceForm);
  clearValidation(popupNewCard, validationConfig)
  Modal.show(popupNewCard);
});

profileAvatarEditButton.addEventListener("click", () => {
  clearForm(editAvatarForm);
  clearValidation(popupEditAvatar, validationConfig)
  Modal.show(popupEditAvatar);
});

[popupTypeImage, editProfilePopup, popupNewCard, popupEditAvatar].forEach((popUp) => {
  popUp.addEventListener("click", (e) => {
    if (e.currentTarget === e.target) {
      Modal.close(popUp);
    }
  });
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handleCardFormSubmit);
editAvatarForm.addEventListener('submit',handleAvatarFormSubmit);

popupCloseButtons.forEach(popupCloseButton => {
    const popUp = popupCloseButton.closest(".popup");
    popupCloseButton.addEventListener("click", () => Modal.close(popUp));
});

renderCards();