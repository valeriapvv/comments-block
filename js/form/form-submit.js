import {FormElement} from '../data/constants.js';

// Form

const form = document.forms[FormElement.Form];

// Functions

const setFormSubmit = (callback) => {
  const onSubmit = (evt) => {
    evt.preventDefault();

    callback();

    evt.target.reset();
  };

  form.addEventListener('submit', onSubmit);
};

export {
  setFormSubmit,
};
