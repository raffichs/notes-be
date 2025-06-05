import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import User from "./model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "https://h-01-6969.et.r.appspot.com",
    ], // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());
app.use(NoteRoute);

app.listen(port, () => console.log(`Server connected on port ${port}`));

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sooosecret";

// REGISTER API
app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await User.create({
      name,
      username,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, username: user.username },
    });
  } catch (error) {
    console.error("Error /register:", error);
    res.status(422).json(error);
  }
});

// LOGIN API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("LOGIN req body: " + username, password);
  const user = await User.findOne({ where: { username } });
  console.log("LOGIN USER: ", user);
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { username: user.username, id: user._id },
        jwtSecret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            })
            .json(user);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(500).json("not found");
  }
});

// Middleware to check if user is authenticated
app.get("/admin", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, admin) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      res.json(admin);
    });
  } else {
    res.json(null);
  }
});

// LOGOUT API
app.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({ message: "Logged out successfully" });
});
