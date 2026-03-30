const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  var authHeader = req.headers['authorization'];

  console.log('Header recibido:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  var token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Formato de token incorrecto' });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalido o expirado' });
  }
}

module.exports = authMiddleware;