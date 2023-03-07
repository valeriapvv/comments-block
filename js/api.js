import {convertToJson} from './utils.js';

const sendForm = async ({
  url,
  formData,
  onSuccess,
}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: convertToJson(formData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка отправки данных формы');
  }

  const data = await response.json();

  onSuccess(data);
};

export {
  sendForm,
};
