import jwt from "jsonwebtoken";
import { config } from "../config";

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.send({ status: 400, err: err.message });
  }
};

export const login = async (req, res) => {
  const { email } = config.credential; // this is too check in browser
  //   const { email } = req?.body;
  await model.User.findOne({ email })
    .then((resData) => {
      const { email, userType } = resData;
      const jwtCookie = req.cookies.jwt;
      if (!jwtCookie) {
        // If the JWT doesn't exist, generate a new one
        const token = jwt.sign({ email, userType }, "14986");

        // Set the JWT token as a cookie
        res.cookie("jwt", token, { httpOnly: true, secure: true });
        res.send("JWT token saved in a cookie: " + token);
      } else res.send("JWT token retrieved from the cookie: " + jwtCookie);
      // If the JWT already exists, you can use it for authentication or any other purpose
    })
    .catch((err) => res.send({ status: 400, err: err.message }));
};
