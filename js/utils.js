// Date

const formatByTwoDigits = (dateUnit) => dateUnit < 10 ? `0${dateUnit}` : dateUnit;

const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  const year = date.getFullYear();
  const month = formatByTwoDigits(
    date.getMonth() + 1
  );
  const day = formatByTwoDigits(
    date.getDate()
  );
  const hours = formatByTwoDigits(
    date.getHours()
  );
  const minutes = formatByTwoDigits(
    date.getMinutes()
  );
  const seconds = formatByTwoDigits(
    date.getSeconds()
  );


  return {
    get humanized() {
      return `${day}.${month}.${year}, ${hours}:${minutes}`;
    },
    get datetime() {
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
  };
};

// Form

const generateId = () => `id${Date.now()}`;

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

export {
  formatDate,
  generateId,
  convertToJson,
};
