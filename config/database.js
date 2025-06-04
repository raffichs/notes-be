import { Sequelize } from "sequelize";

const db = new Sequelize("notes_db", "root", "raffiganteng", {
  host: "34.101.175.228",
  dialect: "mysql",
});

db.authenticate()
  .then(() => console.log("✅ Connected to DB!"))
  .catch((err) => console.error("❌ DB connection failed:", err));

export default db;
