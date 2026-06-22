const jwt = require("jsonwebtoken");

const NEW_TOKEN = process.env.NEW_TOKEN;

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      exception: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.NEW_TOKEN);
    // console.log('sk',process.env.NEW_TOKEN);
    

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      exception: "Invalid or expired token",
    });
  }
};
