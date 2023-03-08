import {FormElement} from '../data/constants.js';
import {formatDate} from '../utils.js';

const getCommentTemplate = (userComment = {}) => {
  const commentId = userComment.commentId;
  const name = userComment[FormElement.UserName];
  const comment = userComment[FormElement.Comment];
  const date = formatDate(
    userComment[FormElement.Date]
  );

  return (`
    <li class="chat__item" data-comment-id="${commentId}">
      <span class="chat__username">${name}</span>
      <time class="chat__publication-time" datetime="${date.datetime}">${date.humanized}</time>
      <p class="chat__comment">${comment}</p>

      <button class="chat__delete" type="button" aria-label="Удалить комментарий">
        <svg class="chat__delete-icon" width="24" height="24" aria-hidden="true" focusable="false">
          <use href="img/sprite.svg#bin" />
        </svg>
      </button>

      <button class="chat__favorite" type="button" aria-label="Добавить в избранные">
        <svg class="chat__favorite-icon" width="24" height="24" aria-hidden="true" focusable="false">
          <use href="img/sprite.svg#heart" />
        </svg>
      </button>
    </li>
  `);
};

const renderComment = ({
  userComment,
  commentsContainer,
} = {}) => {
  commentsContainer.insertAdjacentHTML('afterbegin', getCommentTemplate(userComment));
};

export {
  renderComment,
};
