const http = require('http');
const mysql = require('mysql2/promise');
const app = require('./app');
const { initSocket } = require('./services/socket');
const sequelize = require('./config/database');
const SpeedData = require('./models/models');
const config = require('./config/config')

const port = process.env.PORT || 5000;
const server = http.createServer(app); 

initSocket(server);

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\`;`);
  await connection.end();
};

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  
  try {
    await createDatabase();
    await sequelize.sync({ force: true }); 
    console.log("Database & tables created!");
  } catch (error) {
    console.error('Unable to sync database:', error);
  }

  speedGeneration();
});

async function speedGeneration() {
  setInterval(async () => {

    // generating random speed in 0-100 and rounding off
    const speed = Math.round(Math.random() * 100); 
    const newSpeedData = await SpeedData.create({ speed });
    console.log(`Generated new speed data: ${newSpeedData.speed} km/h`);

    // Emiting the data to connected clients on server
    const io = require('./services/socket').getIo();
    io.emit('new-speed-data', newSpeedData);
  }, 1000); 
}
