var current = new Date();

export const timeStamp = new Date(
  Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    current.getHours(),
    current.getMinutes(),
    current.getSeconds(),
    current.getMilliseconds()
  )
);
