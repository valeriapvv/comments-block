import {
  sendCommentDelete,
  sendPatch,
} from '../api.js';
import {showMessage} from '../popups/popup.js';

const CommentClassName = {
  Item: '.chat__item',
  Delete: '.chat__delete',
  LikeToggle: '.chat__favorite',
  LikesCount: '.chat__likes',
};

const LIKE_ON_CLASS_NAME = 'chat__favorite--checked';
const DATA_LIKE_ON = 'data-like-on';

const initCommentAction = ({
  url,
  commentsContainer,
}) => {
  const deleteComment = ({
    button,
    commentItem,
    commentId,
  }) => {
    const onSuccess = () => commentItem.remove();
    const onFail = () => {
      showMessage();
      button.disabled = false;
    };

    sendCommentDelete({
      url,
      commentId,
      onSuccess,
      onFail,
    });
  };

  const toggleLike = ({
    button,
    commentItem,
    commentId,
  }) => {
    const isChecked = commentItem.hasAttribute(DATA_LIKE_ON);

    const likesCountElement = button.querySelector(CommentClassName.LikesCount);
    const likesCount = parseInt(likesCountElement.textContent, 10);

    const body = JSON.stringify({
      isLikeOn: !isChecked,
    });

    const onSuccess = ({isLikeOn}) => {
      commentItem.toggleAttribute(DATA_LIKE_ON, isLikeOn);
      button.classList.toggle(LIKE_ON_CLASS_NAME, isLikeOn);

      likesCountElement.textContent = isLikeOn ? likesCount + 1 : likesCount - 1;
    };
    const onFail = showMessage;
    const onFinal = () => {
      button.disabled = false;
    };

    sendPatch({
      url,
      commentId,
      body,
      onSuccess,
      onFail,
      onFinal,
    });
  };

  const onClick = (evt) => {
    const element = evt.target;
    const button =
      element.closest(CommentClassName.Delete) || element.closest(CommentClassName.LikeToggle);

    if (!button || button.disabled) {
      return;
    }

    const commentItem = element.closest(CommentClassName.Item);
    const commentId = commentItem.dataset.commentId;
    button.disabled = true;

    if (button.matches(CommentClassName.Delete)) {
      deleteComment({
        button,
        commentItem,
        commentId,
      });

      return;
    }

    toggleLike({
      button,
      commentItem,
      commentId,
    });
  };

  commentsContainer.addEventListener('click', onClick);
};

export {
  initCommentAction,
};
