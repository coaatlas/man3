const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();


//Conectar a base de datos

dbConnection();

const port = process.env.PORT ;

//cors

app.use(cors());

// Directorio Público
app.use( express.static(path.join(__dirname, './public')) );

app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/presupuestos', require('./routes/presupuestos'));

app.get('/*', (req, res) => {
    res.sendFile (path.join(__dirname, './public/index.html'));

});


app.listen(port, () => {
    console.log('Server is running on port :', port);
    }
);