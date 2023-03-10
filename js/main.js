import {initForm} from './form/form.js';
import {setCommentDelete} from './comments/comment-delete.js';
import {setLikeToggle} from './comments/like-toggle.js';

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
