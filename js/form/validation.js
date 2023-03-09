import {
  FormElement,
  InputClassName,
  UserNameLength,
  COMMENT_MAX_LENGTH,
  NameErrorType,
  CommentErrorType,
} from '../data/constants.js';
import {
  UserNameError,
  CommentError,
} from './validation-errors.js';

const ErrorByName = {
  [FormElement.UserName]: UserNameError,
  [FormElement.Comment]: CommentError,
};

export default class Validation {
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

    this.#setInputHandler();
  }

  check() {
    let isValid = true;

    if (!this.#isValidName()) {
      this.#showError(FormElement.UserName);
      isValid = false;
    }

    if (!this.#isValidComment()) {
      this.#showError(FormElement.Comment);
      isValid = false;
    }

    return isValid;
  }

  #isValidName() {
    const userNameValue = this.#form[FormElement.UserName].value;

    if (!userNameValue) {
      UserNameError.message = NameErrorType.Empty;
      return false;
    }

    if (userNameValue.length < UserNameLength.Min) {
      UserNameError.message = NameErrorType.MinLength;
      return false;
    }

    if (userNameValue.length > UserNameLength.Max) {
      UserNameError.message = NameErrorType.MaxLength;
      return false;
    }

    return true;
  }

  #isValidComment() {
    const commentValue = this.#form[FormElement.Comment].value;

    if (!commentValue) {
      CommentError.message = CommentErrorType.Empty;
      return false;
    }

    if (commentValue.length > COMMENT_MAX_LENGTH) {
      CommentError.message = CommentErrorType.MaxLength;
      return false;
    }

    return true;
  }

  #showError(elementName) {
    this.#form[elementName].classList.add(InputClassName.IsInvalid);
    this.#ErrorElement[elementName].textContent = ErrorByName[elementName].message;
  }

  #hideError(elementName) {
    this.#form[elementName].classList.remove(InputClassName.IsInvalid);
    this.#ErrorElement[elementName].textContent = '';
  }

  #setInputHandler() {
    this.#form.addEventListener('input', (evt) => {
      const element = evt.target;
      const hasInvalidClassName = element.classList.contains(InputClassName.IsInvalid);

      if (hasInvalidClassName) {
        this.#hideError(element.name);
      }
    });
  }

  #setErrorElements() {
    for (const elementName of Object.values(FormElement)) {
      const container = this.#fieldContainerClassName;
      const error = this.#errorClassName;

      this.#ErrorElement[elementName] = this.#form
        .querySelector(`.${container}--${elementName} .${error}`);
    }
  }

}
