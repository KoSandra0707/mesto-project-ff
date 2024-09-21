const template = document.getElementById("card-template");
const placesList = document.querySelector(".places__list");

const createTemplateCard = (name, url) => {
    const div = document.createElement("div");
    const contentTemplate = template.content.cloneNode(true);

    div.appendChild(contentTemplate)
    div.querySelector(".card__delete-button").onclick = () => document.getElementsByClassName("places__list")[0].removeChild(div);
    div.querySelector(".card__title").textContent = name;
    const img = div.querySelector(".card__image");

    img.src = url;
    img.alt = name;

    return div;
}

const createCard = (name, url) => {
    const card = createTemplateCard(name, url);

    placesList.appendChild(card);
}

const initCard = () => initialCards.forEach((x) => {
    createCard(x.name, x.link);
})

window.onload = initCard;