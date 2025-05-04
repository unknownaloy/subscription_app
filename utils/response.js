export const responseHandler = (res, data, statusCode = 200) => {
  res
    .status(statusCode)
    .send({ ...data, statusCode: statusCode, timestamp: new Date().toJSON() });
};
