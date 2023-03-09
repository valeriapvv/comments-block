// Form

const FormElement = {
  Form: 'comment-form',
  UserName: 'user-name',
  Comment: 'comment',
  Date: 'date',
};

const InputClassName = {
  IsValid: 'is-valid',
  IsInvalid: 'is-invalid',
};

// Validation

const UserNameLength = {
  Min: 2,
  Max: 50,
};

const COMMENT_MAX_LENGTH = 400;

const NameErrorType = {
  MinLength: 'minLength',
  MaxLength: 'maxLength',
  Empty: 'empty',
};

const CommentErrorType = {
  MaxLength: 'maxLength',
  Empty: 'empty',
};

export {
  FormElement,
  InputClassName,
  UserNameLength,
  COMMENT_MAX_LENGTH,
  NameErrorType,
  CommentErrorType,
};
