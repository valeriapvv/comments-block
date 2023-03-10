import {FormElement} from '../data/constants.js';
import Validation from './validation.js';
import {getDataToSend} from '../utils.js';
import {renderComment} from '../comments/render-comment.js';
import {showMessage} from '../popups/popup.js';
import {sendForm} from '../api.js';

const Disabled = {
  On: true,
  Off: false,
};

// Form

const form = document.forms[FormElement.Form];
const formFieldsets = form.querySelectorAll('fieldset');
const submitButton = form.querySelector('[type="submit"]');

// Validation instance

const validation = new Validation({
  form,
  fieldContainerClassName: 'field',
  errorClassName: 'field__error',
});

// Functions

const formToggler = (isDisabled) => () => {
  for (const group of formFieldsets) {
    group.disabled = isDisabled;
  }

  submitButton.disabled = isDisabled;
};

const disableForm = formToggler(Disabled.On);
const enableForm = formToggler(Disabled.Off);

const initForm = ({
  url,
  commentsContainer,
  commentItems,
}) => {
  const onSuccess = (userComment) => {
    renderComment({
      userComment,
      commentsContainer,
      commentItems,
    });

    form.reset();
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!validation.check()) {
      return;
    }

    const formData = getDataToSend({
      form,
      dateFieldName: FormElement.Date,
    });

    sendForm({
      url,
      formData,
      onSuccess,
      onFail: showMessage,
      onFinal: enableForm,
    });

    disableForm();
  };

  form.addEventListener('submit', onSubmit);
};

export {
  initForm,
};
