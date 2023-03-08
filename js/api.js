import {convertToJson} from './utils.js';

const Method = {
  Get: 'GET',
  Post: 'POST',
};

const load = async ({
  url,
  method = Method.Get,
  body = null,
  headers = new Headers(),
}) => {
  const response = await fetch(url, {
    method,
    body,
    headers,
  });

  if (!response.ok) {
    throw new Error('Ошибка отправки данных формы');
  }

  return response;
};

const sendForm = async ({
  url,
  formData,
  onSuccess,
  onFail,
  onFinal,
}) => {
  const jsonData = convertToJson(formData);

  try {
    const response = await load({
      url,
      method: Method.Post,
      body: jsonData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();
    onSuccess(data);

  } catch(error) {
    onFail();
  } finally {
    onFinal();
  }
};

export {
  sendForm,
};
