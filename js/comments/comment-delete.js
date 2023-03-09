import {sendCommentDelete} from '../api.js';
import {showMessage} from '../popups/popup.js';

const setCommentDelete = ({
  commentsContainer,
  commentClassName,
  deleteClassName,
  url,
}) => {
  const onClick = (evt) => {
    const deleteButton = evt.target.closest(`.${deleteClassName}`);

    if (!deleteButton || deleteButton.disabled) {
      return;
    }

    const commentItem = evt.target.closest(`.${commentClassName}`);
    const commentId = commentItem.dataset.commentId;

    // Отправим запрос на удаление
    const onSuccess = () => commentItem.remove();
    const onFail = () => {
      showMessage();
      deleteButton.disabled = false;
    };

    sendCommentDelete({
      url,
      commentId,
      onSuccess,
      onFail,
    });

    // Заблокируем кнопку на время отправки
    deleteButton.disabled = true;
  };

  commentsContainer.addEventListener('click', onClick);
};

export {
  setCommentDelete,
};
