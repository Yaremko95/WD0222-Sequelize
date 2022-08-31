import { Sequelize } from "sequelize";

const { PGDATABASE, PGHOST, PGPORT, PGPASSWORD, PGUSER } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
  port: PGPORT,
});

export const authenticateDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("db is seccessful");
  } catch (error) {
    console.log(error);
  }
};

export const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log("db is synced");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
