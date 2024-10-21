// middlewares/express-automatic-204.js

const expressAutomatic204 = (req, res, next) => {
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = function (data) {
      if (
          (Array.isArray(data) && data.length === 0) ||
          (data && typeof data === 'object' && Object.keys(data).length === 0)
      ) {
          res.status(204).send();
          return;
      }
      return originalJson(data);
  };

  res.send = function (body) {
      if (
          body === null ||
          body === undefined ||
          (Array.isArray(body) && body.length === 0) ||
          (typeof body === 'object' && Object.keys(body).length === 0)
      ) {
          res.status(204).send();
          return;
      }
      return originalSend(body);
  };

  next();
};

module.exports = expressAutomatic204;
