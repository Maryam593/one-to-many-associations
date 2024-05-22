
import  {Sequelize } from 'sequelize';

const dbUserName = process.env.DB_USERNAME
const dbName = process.env.DB_NAME
const dbPassword = process.env.DB_PASSWORD
const dbLocalhost = process.env.DB_LOCALHOST 

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbLocalhost,
  logging : console.log,
  dialect: 'postgres' 
});


//test the connection

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export {connectDB}
export default sequelize;