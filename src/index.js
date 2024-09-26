import './pages/index.css';
import { deleteCard, createCard } from './components/card.js'
import { setDataForm, clearForm } from './components/form.js'
import * as Modal from './components/modal.js'
import { initialCards } from './components/cards.js'

const templateCard = document.querySelector("#card-template").content.querySelector(".card");
const placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const popupTypeImage = document.querySelector(".popup_type_image");
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card")

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const imgPopUp = popupTypeImage.querySelector(".popup__image");
const caption = popupTypeImage.querySelector(".popup__caption");

const previewCard = (cardData) => {

  imgPopUp.src = cardData.link;
  imgPopUp.alt = cardData.name;
  caption.textContent = cardData.name;

  Modal.show(popupTypeImage);
}

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;

  Modal.close(editProfilePopup);
}

const handleCardFormSubmit = (e) => {
  e.preventDefault();

  createCard(placesList, templateCard, {
    link: newPlaceForm.elements["link"].value,
    name: newPlaceForm.elements["place-name"].value
  }, { deleteCard, previewCard: previewCard  }, true);

  clearForm(newPlaceForm);
  
  Modal.close(popupNewCard);
};

const renderCards = () => initialCards.forEach((cardData) => {
    createCard(placesList, templateCard, cardData, { deleteCard, previewCard: previewCard });
});

profileEditButton.addEventListener("click", () => {
  Modal.show(editProfilePopup);
  setDataForm(editProfileForm, {
    name: profileTitle.textContent,
    description: profileDescription.textContent
  });
});

profileAddButton.addEventListener("click", () => {
  Modal.show(popupNewCard);
});

[popupTypeImage, editProfilePopup, popupNewCard].forEach((popUp) => {
  popUp.addEventListener("click", (e) => {
    if (e.currentTarget === e.target) {
      Modal.close(popUp);
    }
  });
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handleCardFormSubmit);

popupCloseButtons.forEach(popupCloseButton => {
    const popUp = popupCloseButton.closest(".popup");
    popupCloseButton.addEventListener("click", () => Modal.close(popUp));
});

renderCards();