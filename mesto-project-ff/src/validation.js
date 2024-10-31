export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formList));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};

export function clearValidation(formList, validationConfig) {
    const inputList = Array.from(formList.querySelectorAll(validationConfig.inputList));
    const buttonElement = formList.querySelector(validationConfig.buttonElement);

    inputList.forEach((inputElement) => {
        hideInputError(formList, inputElement, validationConfig);
    });
   
    toggleButtonState(inputList, buttonElement, validationConfig);
}

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.setCustomValidity('');
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputList));
    const buttonElement = formElement.querySelector(validationConfig.buttonElement);
    
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

const hasInvalidInput = (inputList) => {
    
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElementDisabled, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElementDisabled.disabled = true;
        buttonElementDisabled.classList.add(validationConfig.buttonElementDisabled);
    }
    else {
        buttonElementDisabled.disabled = false;
        buttonElementDisabled.classList.remove(validationConfig.buttonElementDisabled);
    }
};