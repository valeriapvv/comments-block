// Date

const TWO_DAYS_MILLISECONDS = 2 * 24 * 3600 * 1000;

const formatByTwoDigits = (dateUnit) => dateUnit < 10 ? `0${dateUnit}` : dateUnit;

const getHumanizedDate = (date, day, month, year) => {
  const now = new Date();
  const timeDiff = now - date;

  if (timeDiff < TWO_DAYS_MILLISECONDS && timeDiff >= 0) {
    const nowDay = now.getDate();
    const dateByDiff = new Date(now - timeDiff).getDate();

    return dateByDiff === nowDay ? 'сегодня' : 'вчера';
  }

  return `${day}.${month}.${year}`;
};

const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  const year = date.getFullYear();
  const month = formatByTwoDigits(date.getMonth() + 1);
  const day = formatByTwoDigits(date.getDate());
  const hours = formatByTwoDigits(date.getHours());
  const minutes = formatByTwoDigits(date.getMinutes());
  const seconds = formatByTwoDigits(date.getSeconds());

  return {
    get humanized() {
      return `${getHumanizedDate(date, day, month, year)}, ${hours}:${minutes}`;
    },
    get datetime() {
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
  };
};

// Form

const generateId = () => `id${Date.now()}`;

const getCommentDate = (fieldValue) => {
  const date = new Date(fieldValue);
  const now = new Date();

  if (!fieldValue) {
    return now;
  }

  // Для выбранной даты устанавливаем текущее время
  date.setHours(now.getHours());
  date.setMinutes(now.getMinutes());
  date.setSeconds(now.getSeconds());

  return date;
};

const getDataToSend = ({
  form,
  dateFieldName,
} = {}) => {
  const data = new FormData(form);
  const commentDate = getCommentDate(form[dateFieldName].value);

  data.set(dateFieldName, commentDate);
  data.set('commentId', generateId());

  return data;
};

const convertToJson = (formData) => {
  if (!(formData instanceof FormData)) {
    throw new Error('Некорректные данные формы');
  }

  const result = {};

  for (const [name, value] of formData) {
    result[name] = value;
  }

  return JSON.stringify(result);
};

// Encode
const SymbolsMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '/': '&#x2F;',
};

const encodeForHtml = (string) => {
  const regExp = /[&<>"'/]/ig;
  return string.replace(regExp, (match) => SymbolsMap[match]);
};

export {
  formatDate,
  getDataToSend,
  convertToJson,
  encodeForHtml,
};
