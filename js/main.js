import {setFormSubmit} from './form/form-submit.js';
import {renderComment} from './comments/render-comments.js';

// Инициализирует работу формы
const commentsContainer = document.querySelector('#comments-list');

const onSuccessSubmit = () => {
  renderComment({
    commentsContainer,
  });
};

setFormSubmit(onSuccessSubmit);
