import {FormElement, InputClassName} from '../data/constants.js';

const UserNameLength = {
  Min: 2,
  Max: 50,
};

const ErrorType = {
  MinLength: 'minLength',
  MaxLength: 'maxLength',
  Empty: 'empty',
};

const UserNameError = {
  [ErrorType.MinLength]: `Длина имени должна быть не меньше ${UserNameLength.Min}`,
  [ErrorType.MaxLength]: `Длина имени должна быть не больше ${UserNameLength.Max}`,
  [ErrorType.Empty]: 'Введите свое имя',
  _message: null,
  set message(type) {
    this._message = this[type];
  },
  get message() {
    return this._message;
  },
};

class Validation {
  #form = null;
  #fieldContainerClassName = 'field-container';
  #errorClassName = 'error';

  #ErrorElement = {};

  constructor({
    form,
    fieldContainerClassName,
    errorClassName,
  }) {
    this.#form = form;
    this.#fieldContainerClassName = fieldContainerClassName;
    this.#errorClassName = errorClassName;

    // Уберем браузерную валидацию
    this.#form.noValidate = true;

    // Найдем элементы, отвечающие за сообщения об ошибке
    this.#setErrorElements();
  }

  check() {
    if (!this.#isValidName()) {
      this.#showError(FormElement.UserName);
      return false;
    }

    return true;
  }

  #isValidName() {
    const userNameValue = this.#form[FormElement.UserName].value;

    if (!userNameValue) {
      UserNameError.message = ErrorType.Empty;
      return false;
    }

    if (userNameValue.length < UserNameLength.Min) {
      UserNameError.message = ErrorType.MinLength;
      return false;
    }

    if (userNameValue.length > UserNameLength.Max) {
      UserNameError.message = ErrorType.MaxLength;
      return false;
    }

    return true;
  }

  #showError = (elementName) => {
    this.#form[elementName].classList.add(InputClassName.IsInvalid);
    this.#ErrorElement[elementName].textContent = UserNameError.message;
  };

  #setErrorElements = () => {
    for (const elementName of Object.values(FormElement)) {
      const container = this.#fieldContainerClassName;
      const error = this.#errorClassName;

      this.#ErrorElement[elementName] = this.#form
        .querySelector(`.${container}--${elementName} .${error}`);
    }
  };

}

export default Validation;
