import {
  UserNameLength,
  COMMENT_MAX_LENGTH,
  NameErrorType,
  CommentErrorType,
} from '../data/constants.js';
import ErrorMessage from './error-message-constructor.js';


const UserNameError = new ErrorMessage({
  [NameErrorType.MinLength]: `Длина имени должна быть не меньше ${UserNameLength.Min}`,
  [NameErrorType.MaxLength]: `Длина имени должна быть не больше ${UserNameLength.Max}`,
  [NameErrorType.Empty]: 'Введите свое имя',
});

const CommentError = new ErrorMessage({
  [CommentErrorType.MaxLength]: `Длина комментария должна быть не более ${COMMENT_MAX_LENGTH}`,
  [CommentErrorType.Empty]: 'Напишите свой комментарий',
});

export {
  UserNameError,
  CommentError,
};
