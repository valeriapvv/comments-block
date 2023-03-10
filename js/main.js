import {setFormSubmit} from './form/form-submit.js';
import {renderComment} from './comments/render-comments.js';
import {sendForm} from './api.js';
import {showMessage} from './popups/popup.js';
import {setCommentDelete} from './comments/comment-delete.js';
import {setLikeToggle} from './comments/like-toggle.js';

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

//// Реализует удаление комментария

setCommentDelete({
  commentsContainer,
  commentClassName: 'chat__item',
  deleteClassName: 'chat__delete',
  url: jsonplaceholderUrl,
});

//// Реализует переключение лайка

setLikeToggle({
  commentsContainer,
  commentClassName: 'chat__item',
  favoriteClassName: 'chat__favorite',
  likesCountClassName: 'chat__likes',
  url: jsonplaceholderUrl,
});
