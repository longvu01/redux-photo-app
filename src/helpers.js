const timer = (s) => {
  return new Promise((_, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      reject(new Error('Request took too long!'));
    }, s * 1000);
  });
};
