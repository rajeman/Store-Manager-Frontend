
const sendResponse = (res, code, message, error) => {
  res.status(code).send({
    message: message || error,
    error: error || message,
    code,
  });
};

export default sendResponse;
