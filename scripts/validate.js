const form = document.querySelector('.popup__form');

const validators = {
    nickname: validateNickname,
    job: validateJob,
    place: validatePlace,
    link: validateLink
};

const classNames = {
    input: 'popup__input',
    inputInvalid: 'popup__input_invalid',
    error: 'popup__error'
};

function handleSubmit(values, e) {
    e.preventDefault();
    console.log(values);
}

function handleError() {
    console.error('From error');
}

enableValidation(form, validators, classNames, handleSubmit, handleError);

function enableValidation(form, validators, classNames, handleSubmit, handleError) {
    const validate = (key, value) => {
        const validator = validators[key];
        return validator(value);
    };

    const getInputElement = key => {
        return form.querySelector(`.${classNames.input}[name=${key}]`);
    };

    const getErrorElement = key => {
        return form.querySelector(`.${classNames.error}[data-key=${key}]`);
    };

    const setError = (key, errorMessage) => {
        const input = getInputElement(key);
        input.classList.add(classNames.inputInvalid);

        let errorEl = getErrorElement(key);
        if (!errorEl) {
            errorEl = document.createElement('p');
            input.after(errorEl);
        }
        errorEl.textContent = errorMessage;
        errorEl.classList.add(classNames.error);
        errorEl.dataset.key = key;
    };

    const clearError = (key) => {
        const input = getInputElement(key);
        input.classList.remove(classNames.inputInvalid);

        const errorEl = getErrorElement(key);
        if (errorEl) {
            errorEl.remove();
        }
    };

    form.addEventListener('input', e => {
        const key = e.target.name;
        const value = e.target.value;
        const input = e.target;

        const error = validate(key, value);

        if (!error) {
            input.onblur = () => {
                input.dataset.dirty = 'true';
                input.onblur = null;
            };
            clearError(key);
            return;
        }

        if (input.dataset.dirty === 'true') {
            setError(key, error);
            return;
        }

        input.onblur = () => {
            input.dataset.dirty = 'true';
            input.onblur = null;
            setError(key, error);
        };
    });

    form.addEventListener('submit', e => {
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);

        let isFormValid = true;

        formData.forEach((value, key) => {
            const input = getInputElement(key);
            input.dataset.dirty = 'true';

            const error = validate(key, value);

            if (!error) {
                clearError(key);
                return;
            }

            setError(key, error);
            isFormValid = false;
        });

        if(!isFormValid) {
            e.preventDefault();
            handleError();
            return;
        }
        handleSubmit();
        
    });
}

function validateNickname(value) {
    if (!value) {
        return 'Введите имя пользователя';
    }

    if (value.length < 2 || value.length > 40) {
        return 'Имя пользователя должно быть от 2 до 40 символов';
    }

    return null;
}

function validateJob(value) {
    if (!value) {
        return 'Введите информацию о себе';
    }

    if (value.length < 2 || value.length > 200) {
        return 'Информация о себе должна быть от 2 до 200 символов';
    }

    return null;
}

function validatePlace(value) {
    if (!value) {
        return 'Введите название места';
    }

    if (value.length < 2 || value.length > 30) {
        return 'Название места должно быть от 2 до 30 символов';
    }

    return null;
}

function validateLink(value) {
    const input = document.createElement('input');

    input.type = 'url';
    input.required = true;
    input.value = value;

    const isValid = input.checkValidity();

    if (!value) {
        return 'Введите ссылку';
    }

    if (!isValid) {
        return 'Введите корректную ссылку';
    }

    return null;
}