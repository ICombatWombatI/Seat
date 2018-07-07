var jwt = require('jsonwebtoken'); // подключаем jwt

var config = require('../../settings'); // подключаем сикрет

function verifyToken(req, res, next) {
  // Получаем подпись токена
  const token = req.headers["x-customheader"];
  // Смотрим, есть ли он вообще
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  // Проверяем сикрет
  jwt.verify(token, config.secret, function(err, decoded) { 
    if (err) // Если сикрет не подошел - отправляем статус 500
      return res.status(500).send({ token : null ,auth: false, message: 'Failed to authenticate token.' });

    next();
  });

}

module.exports = verifyToken;