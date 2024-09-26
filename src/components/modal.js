const handleEscape = (e) => {
    if (e.key === "Escape"){
        const allPopUp = e.currentTarget.querySelectorAll(".popup");
        allPopUp.forEach(popUp => {
            close(popUp); 
        });
    }
};

const show = (popUp) => {
    popUp.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
};

const close = (popUp) => {
    popUp.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
}

export { show, close }