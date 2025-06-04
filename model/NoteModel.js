import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Note = db.define("note", {
  note: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

db.sync().then(() => console.log("db synced"));

export default Note;
