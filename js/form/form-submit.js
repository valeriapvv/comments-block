import {FormElement} from '../data/constants.js';
import {generateId} from '../utils.js';
import Validation from './validation.js';

// Form

const form = document.forms[FormElement.Form];
const formFieldsets = form.querySelectorAll('fieldset');
const formFields = form.elements;
const submitButton = form.querySelector('[type="submit"]');

// Validation instance
const validation = new Validation({
  form,
  fieldContainerClassName: 'field',
  errorClassName: 'field__error',
});

// Fields

const dateField = formFields[FormElement.Date];

// Functions

const getCommentDate = (fieldValue) => {
  const date = new Date(fieldValue);
  const now = new Date();

  if (!fieldValue) {
    return now;
  }

  // Для выбранной даты устанавливаем текущее время
  date.setHours(now.getHours());
  date.setMinutes(now.getMinutes());

  return date;
};

const getDataToSend = () => {
  const data = new FormData(form);
  const commentDate = getCommentDate(dateField.value);

  data.set(FormElement.Date, commentDate);
  data.set('commentId', generateId());

  return data;
};

const disableForm = () => {
  for (const group of formFieldsets) {
    group.disabled = true;
  }

  submitButton.disabled = true;
};

const enableForm = () => {
  for (const group of formFieldsets) {
    group.disabled = false;
  }

  submitButton.disabled = false;
};

// Очистка формы после успешной отправки
const onSuccessCb = () => {
  form.reset();
};

const setFormSubmit = (sendData) => {
  const onSubmit = (evt) => {
    evt.preventDefault();

    const formData = getDataToSend();
    disableForm();

    if (!validation.check()) {
      enableForm();
      return;
    }

    sendData({
      formData,
      onSuccessCb,
      onFinalCb: enableForm,
    });
  };

  form.addEventListener('submit', onSubmit);
};

export {
  setFormSubmit,
};
