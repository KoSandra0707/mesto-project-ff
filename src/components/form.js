const setDataForm = (form, data) => {
    for(let i = 0; i < form.elements.length; i++){
        const element = form.elements[i];
        if (element.nodeName.toLowerCase() === "input" &&
            data.hasOwnProperty(element.name)){
                element.value = data[element.name];
        }
    }
}

const clearForm = (form) => {
    for(let i = 0; i < form.elements.length; i++){
        const element = form.elements[i];
        if (element.nodeName.toLowerCase() === "input"){
                element.value = '';
        }
    }
}

const renderLoadingFormWithOperationAsync = async (from, operation) => {
    const button = from.querySelector(".popup__button");

    renderLoading(true, button);
    await operation();
    renderLoading(false, button);
}

const renderLoading = (isLoading, buttonElement) => {
    const loadingDots = "...";
    if (isLoading) {
      buttonElement.textContent = buttonElement.textContent + loadingDots;
      buttonElement.disabled = true;
    } else {
      buttonElement.textContent = buttonElement.textContent.replace(loadingDots, '');
      buttonElement.disabled = false;
    }
  }

export { setDataForm, clearForm, renderLoadingFormWithOperationAsync }