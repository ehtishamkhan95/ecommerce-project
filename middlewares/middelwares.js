import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    token = authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      req.user = payload;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  

  