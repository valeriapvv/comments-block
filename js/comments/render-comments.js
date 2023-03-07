import {FormElement} from '../data/constants.js';
import {formatDate} from '../utils.js';

const defaultComment = {
  id: 0,
  [FormElement.UserName]: 'John Doe',
  [FormElement.Comment]: 'The use of "John Doe" as a name for anonymous or unidentified people dates to 13th century England, when the name was first used in legal documents to protect the identity of witnesses.',
  [FormElement.Date]: '2023-01-01T10:00',
};

const getCommentTemplate = (userComment = defaultComment) => {
  const id = userComment.id;
  const name = userComment[FormElement.UserName];
  const comment = userComment[FormElement.Comment];
  const date = formatDate(
    userComment[FormElement.Date]
  );

  return (`
    <li class="chat__item" data-comment-id="${id}">
      <span class="chat__username">${name}</span>
      <time class="chat__publication-time" datetime="${date.datetime}">${date.humanized}</time>
      <p class="chat__comment">${comment}</p>

      <button class="chat__delete button" type="button" aria-label="Удалить комментарий">
        <svg class="chat__delete-icon" width="24" height="24" aria-hidden="true" focusable="false">
          <use href="img/sprite.svg#bin" />
        </svg>
      </button>

      <button class="chat__favorite button" type="button" aria-label="Добавить в избранные">
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
  commentsContainer.insertAdjacentHTML('beforeend', getCommentTemplate(userComment));
};

export {
  renderComment,
};
