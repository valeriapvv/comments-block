import {FormElement} from '../data/constants.js';
import {formatDate} from '../utils.js';

const Insert = {
  Before: 'beforebegin',
  After: 'afterend',
  Append: 'beforeend',
  Prepend: 'afterbegin',
};

const getCommentTemplate = (userComment = {}) => {
  const {commentId, likes = 0, isLikeOn = false} = userComment;
  const name = userComment[FormElement.UserName];
  const comment = userComment[FormElement.Comment];
  const date = formatDate(
    userComment[FormElement.Date]
  );

  return (`
    <li class="chat__item" data-datetime="${date.datetime}"
    ${isLikeOn ? 'data-like-on' : ''} data-comment-id="${commentId}">
      <span class="chat__username">${name}</span>
      <time class="chat__publication-time" datetime="${date.datetime}">${date.humanized}</time>
      <p class="chat__comment">${comment}</p>

      <button class="chat__delete" type="button" aria-label="Удалить комментарий">
        <svg class="chat__delete-icon" width="24" height="24" aria-hidden="true" focusable="false">
          <use href="img/sprite.svg#bin" />
        </svg>
      </button>

      <button class="chat__favorite ${isLikeOn ? 'chat__favorite--checked' : ''}" type="button" aria-label="Добавить в избранные">
        <svg class="chat__favorite-icon" width="24" height="24" aria-hidden="true" focusable="false">
          <use href="img/sprite.svg#heart" />
        </svg>
        <span class="chat__likes">${likes}</span>
      </button>
    </li>
  `);
};

const findEarlierComment = (newCommentDate, commentItems) => {
  const isEarlier = (item) => {
    const itemDate = new Date(item.dataset.datetime);
    return newCommentDate >= itemDate;
  };

  return Array.from(commentItems)
    .find(isEarlier);
};

const renderComment = ({
  userComment,
  commentsContainer,
  commentItems,
} = {}) => {
  const commentTemplate = getCommentTemplate(userComment);

  if (!commentItems.length) {
    commentsContainer.insertAdjacentHTML(Insert.Append, commentTemplate);
    return;
  }

  const commentDate = new Date(userComment.date);
  const earlierComment = findEarlierComment(commentDate, commentItems);

  if (!earlierComment) {
    commentsContainer.insertAdjacentHTML(Insert.Append, commentTemplate);
    return;
  }

  earlierComment.insertAdjacentHTML(Insert.Before, commentTemplate);
};

export {
  renderComment,
};
