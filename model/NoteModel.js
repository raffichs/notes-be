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

db.sync().then(() => console.log("note synced"));

export default Note;
