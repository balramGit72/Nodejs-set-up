import  express  from "express";
import cors  from "cors";
import router from './router.js';

import sequelize from './sequelize.js';
// import User from './models/User.js'; // Assuming you have defined the User model in this file
import Models from './models/index.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/', router)

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello world'
    })
})

// index.js

Models.associateModels();


async function initializeApp() {
  try {
    console.log('Initializing')
    await sequelize.authenticate();
    console.log('Connected to the database');

    await sequelize.sync({ alter: true }); // Sync the models with the database

    // Your application logic here...

    // Close the connection when the application exits
    // process.on('SIGINT', () => {
    //   sequelize.close().then(() => console.log('Connection closed'));
    // });
  } catch (error) {
    console.error('Error:', error);
  }
}

initializeApp();



app.listen(port, ()=>{
    console.log('listening on port', port);
})