import jwt from "jsonwebtoken";
import errors from "./errors.js";

const SECRET_KEY = process.env.SECRET_KEY;

const jwtAuth = {
  verifyToken: (req, res, next) => {
    let authorization = req.headers["authorization"];
    let token = authorization && authorization.split(" ")[1];
    if (!token) return errors.e400(req, res, "Token not provided");
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return errors.e400(req, res, "Invalid or expired token");
      req.user = user;
      next();
    });
  },
  refreshToken: (req, res) => {
    let authorization = req.headers["authorization"];
    let token = authorization && authorization.split(" ")[1];
    if (!token) return errors.e400(req, res, "Token not provided");
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return errors.e400(req, res, "Invalid token");
      let newAccessToken = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "15m",
      });
      res.json({
        accessToken: newAccessToken,
      });
    });
  },
};

export default jwtAuth;
