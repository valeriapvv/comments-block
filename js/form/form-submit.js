import {FormElement} from '../data/constants.js';
import {generateId} from '../utils.js';

// Form

const form = document.forms[FormElement.Form];
const formFields = form.elements;

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

const setFormSubmit = (callback) => {
  const onSubmit = (evt) => {
    evt.preventDefault();

    const formData = getDataToSend();
    callback(formData);

    evt.target.reset();
  };

  form.addEventListener('submit', onSubmit);
};

export {
  setFormSubmit,
};
