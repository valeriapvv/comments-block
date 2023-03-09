import {setFormSubmit} from './form/form-submit.js';
import {renderComment} from './comments/render-comments.js';
import {sendForm} from './api.js';
import {showMessage} from './popups/popup.js';

//// Инициализирует работу формы

const commentsContainer = document.querySelector('#comments-list');
const commentItems = commentsContainer.children;

// Тестируем отправку данных на фейковый url

const jsonplaceholderUrl = 'https://jsonplaceholder.typicode.com/comments/';


// Callback для отправки данных на сервер
const formSubmitCb = ({
  formData,
  onSuccessCb,
  onFinalCb,
}) => {

  // Рендеринг комментария после отправки данных на сервер
  const onSuccess = (data) => {
    renderComment({
      userComment: data,
      commentsContainer,
      commentItems,
    });

    onSuccessCb();
  };

  // Отправляет данные на сервер
  sendForm({
    url: jsonplaceholderUrl,
    formData,
    onSuccess,
    onFail: showMessage,
    onFinal: onFinalCb,
  });
};

// Добавляет обработчик отправки формы

setFormSubmit(formSubmitCb);
