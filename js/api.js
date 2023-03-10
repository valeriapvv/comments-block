import {convertToJson} from './utils.js';

const Method = {
  Get: 'GET',
  Post: 'POST',
  Delete: 'DELETE',
  Patch: 'PATCH',
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

const sendCommentDelete = async ({
  url,
  commentId,
  onSuccess,
  onFail,
}) => {
  try {
    await load({
      url: `${url}${commentId}`,
      method: Method.Delete,
    });

    onSuccess();
  } catch (error) {
    onFail();
  }
};

const sendPatch = async ({
  url,
  commentId,
  body,
  onSuccess,
  onFail,
  onFinal,
}) => {
  try {
    const response = await load({
      url: `${url}${commentId}`,
      body,
      method: Method.Patch,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();

    onSuccess(data);
  } catch (error) {
    onFail();
  } finally {
    onFinal();
  }
};

export {
  sendForm,
  sendCommentDelete,
  sendPatch
};
