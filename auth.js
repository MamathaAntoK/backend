const jwt = require('jsonwebtoken');


const secretKey = 'your_secret_key';


exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};


exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
  };
};


exports.generateToken = (user) => {
  const payload = {
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};










