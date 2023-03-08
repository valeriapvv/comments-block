const messagePopup = document.querySelector('.popup--message');
const messageText = messagePopup.querySelector('.popup__message');
const messageClose = messagePopup.querySelector('.popup__close');

const closePopup = () => {
  messagePopup.classList.add('hidden');

  messageClose.removeEventListener('click', closePopup);
  messagePopup.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onOverlayClick(evt) {
  if (evt.target === messagePopup) {
    closePopup();
  }
}

function onEscapeKeydown(evt) {
  if (evt.code === 'Escape' || evt.key === 'Escape') {
    closePopup();
  }
}

const setPopupClose = () => {
  messageClose.addEventListener('click', closePopup);
  messagePopup.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscapeKeydown);
};

const showMessage = (message) => {
  if (message) {
    messageText.textContent = message;
  }

  setPopupClose();
  messagePopup.classList.remove('hidden');
};

export {
  showMessage,
};
