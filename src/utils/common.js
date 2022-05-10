const randomNumber = (start, end) => {
  return start + Math.trunc(Math.random() * (end - start));
};

export { randomNumber };
