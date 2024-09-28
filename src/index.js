import './pages/index.css';
import { deleteCard, createCard } from './components/card.js'
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
const initialCards = await Api.getInitialCards();
let userInfo = undefined;

const updateUserInfo = async () => {
  userInfo = await Api.getUserInfo();
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

await updateUserInfo();

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
    await Api.updateUserInfo(editProfileForm.elements.name.value, editProfileForm.elements.description.value);
    await updateUserInfo();
  });
  Modal.close(editProfilePopup);
};

const handleAvatarFormSubmit = async (e) => {
  e.preventDefault();

  await renderLoadingFormWithOperationAsync(e.currentTarget, async () => {
    await Api.updateAvatar(editAvatarForm.elements.avatar.value);
    await updateUserInfo();
  })
  Modal.close(popupEditAvatar);
};

const handleCardFormSubmit = async (e) => {
  e.preventDefault();
  const name = newPlaceForm.elements["place-name"].value;
  const link = newPlaceForm.elements["link"].value;
  let cardData = undefined;

  await renderLoadingFormWithOperationAsync(e.currentTarget, async () => {
    cardData = await Api.addCard(name, link);

    createCard(placesList, templateCard, cardData, userInfo._id, { previewCard: previewCard  }, true);
  })
  
  Modal.close(popupNewCard);
  clearForm(newPlaceForm);
};

const renderCards = () => initialCards.forEach((cardData) => {
    createCard(placesList, templateCard, cardData, userInfo._id, { previewCard: previewCard });
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