import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

db.sync().then(() => console.log("user synced"));

export default User;
