import db from "../db/db.js";
import jwt from "jsonwebtoken";
import errors from "../middlewares/errors.js";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY;

const cAuth = {
  init: (req, res) => {
    res.json({
      error: false,
      message: "Correct!",
    });
  },
  login: async (req, res) => {
    try {
      setTimeout(async () => {
        let { email, password } = req.body;
        if (!email && !password)
          return errors.e400(req, res, "email and password are undefined");

        if (!email && password)
          return errors.e400(req, res, "email is undefined");

        if (email && !password)
          return errors.e400(req, res, "password is undefined");

        let results = await db.query(
          "SELECT password FROM users WHERE email = ?",
          [email]
        );
        if (results[0].length === 0) {
          return errors.e404(req, res, `Email ${email} not found`);
        }

        let isMatch = await bcrypt.compare(password, results[0][0].password);
        if (!isMatch) {
          return errors.e403(req, res, "Invalid password");
        }

        let accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: "15m" });
        let refreshToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: "7d" });

        res.json({
          error: false,
          message: "Correct!",
          accessToken,
          refreshToken,
        });
      }, 4000);
    } catch (err) {
      return errors.e500(req, res, err);
    }
  },
  signin: async (req, res) => {
    try {
      //This setTimeout is to show the loader in Vue.js
      setTimeout(async () => {
        let { email, password } = req.body;
        if (!email && !password)
          return errors.e400(req, res, "email and password are undefined");

        if (!email && password)
          return errors.e400(req, res, "email is undefined");

        if (email && !password)
          return errors.e400(req, res, "password is undefined");

        let results = await db.query("SELECT * FROM users WHERE email = ?", [
          email,
        ]);
        if (results[0].length > 0)
          return errors.e400(req, res, `Email ${email} already exists`);

        let hash = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users VALUES (DEFAULT, ?, ?)", [
          email,
          hash,
        ]);
        res.json({
          error: false,
          message: `Email ${email} has been successfully registered`,
        });
      }, 4000);
    } catch (err) {
      errors.e500(req, res, err);
    }
  },
};

export default cAuth;
