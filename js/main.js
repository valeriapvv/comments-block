import {setFormSubmit} from './form/form-submit.js';
import {renderComment} from './comments/render-comments.js';
import {sendForm} from './api.js';

//// Инициализирует работу формы

const commentsContainer = document.querySelector('#comments-list');

// Тестируем отправку данных на фейковый url

const jsonplaceholderUrl = 'https://jsonplaceholder.typicode.com/comments/';

// Рендеринг комментария после отправки данных на сервер

const onSendSuccess = (data) => {
  renderComment({
    userComment: data,
    commentsContainer,
  });
};

// Отправляет данные на сервер

const formSubmitCallback = (formData) => {
  sendForm({
    url: jsonplaceholderUrl,
    formData,
    onSuccess: onSendSuccess,
  });
};

// Добавляет обработчик отправки формы

setFormSubmit(formSubmitCallback);
