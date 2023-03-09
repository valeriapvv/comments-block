export default class ErrorMessage {
  #message = null;
  #errorType = {};

  constructor(errorsByType = {}) {
    this.#fillErrorType(errorsByType);
  }

  set message(type) {
    if (!this.#errorType[type]) {
      throw new Error(`Не найдена ошибка с типом ${type}`);
    }

    this.#message = this.#errorType[type];
  }

  get message() {
    return this.#message;
  }

  #fillErrorType(errorsByType) {
    for (const [type, message] of Object.entries(errorsByType)) {
      this.#errorType[type] = message;
    }
  }
}
