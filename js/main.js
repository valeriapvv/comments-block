import {initForm} from './form/form.js';
import {initCommentAction} from './comments/comment-action.js';

const commentsContainer = document.querySelector('#comments-list');
const commentItems = commentsContainer.children;

// Тестируем отправку данных на фейковый url

const jsonplaceholderUrl = 'https://jsonplaceholder.typicode.com/comments/';

//// Инициализирует работу формы

initForm({
  url: jsonplaceholderUrl,
  commentsContainer,
  commentItems,
});

//// Реализует удаление комментария и переключение лайка

initCommentAction({
  url: jsonplaceholderUrl,
  commentsContainer,
});
