// Date

const formatByTwoDigits = (dateUnit) => dateUnit < 10 ? `0${  dateUnit}` : dateUnit;

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


  return {
    get humanized() {
      return `${day}.${month}.${year}, ${hours}:${minutes}`;
    },
    get datetime() {
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
  };
};

export {
  formatDate,
};
