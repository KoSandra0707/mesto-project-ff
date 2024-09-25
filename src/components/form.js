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

export { setDataForm, clearForm }