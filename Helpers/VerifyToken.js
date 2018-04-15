const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require("dotenv").config();

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.headers['token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, process.env.SECRET, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;