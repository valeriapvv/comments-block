import {sendPatch} from '../api.js';
import {showMessage} from '../popups/popup.js';

const DATA_LIKE_ON = 'data-like-on';

const setLikeToggle = ({
  commentsContainer,
  commentClassName,
  favoriteClassName,
  likesCountClassName,
  url,
}) => {
  const toggleLike = (favoriteButton, isLikeOn) => {
    const modifierClassName = `${favoriteClassName}--checked`;
    favoriteButton.classList.toggle(modifierClassName, isLikeOn);
  };

  const onClick = (evt) => {
    const favoriteButton = evt.target.closest(`.${favoriteClassName}`);

    if (!favoriteButton || favoriteButton.disabled) {
      return;
    }

    const commentItem = evt.target.closest(`.${commentClassName}`);
    const commentId = commentItem.dataset.commentId;
    const isChecked = commentItem.hasAttribute(DATA_LIKE_ON);

    const likesCountElement = favoriteButton.querySelector(`.${likesCountClassName}`);
    const likesCount = parseInt(likesCountElement.textContent, 10);

    // Отправим запрос на изменение
    const body = JSON.stringify({
      isLikeOn: !isChecked,
    });

    const onSuccess = ({isLikeOn}) => {
      commentItem.toggleAttribute(DATA_LIKE_ON, isLikeOn);
      toggleLike(favoriteButton, isLikeOn);

      likesCountElement.textContent = isLikeOn ? likesCount + 1 : likesCount - 1;
    };
    const onFail = showMessage;
    const onFinal = () => {
      favoriteButton.disabled = false;
    };

    sendPatch({
      url,
      commentId,
      body,
      onSuccess,
      onFail,
      onFinal,
    });

    favoriteButton.disabled = true;
  };

  commentsContainer.addEventListener('click', onClick);
};

export {
  setLikeToggle,
};

