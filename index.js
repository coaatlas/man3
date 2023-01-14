const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();


//Conectar a base de datos

dbConnection();

const port = process.env.PORT ;

//cors

app.use(cors());

//Directorio publico
app.use(express.static('public'));

app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(port, () => {
    console.log('Server is running on port :', port);
    }
);