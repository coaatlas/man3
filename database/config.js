const mongoose = require('mongoose');

const dbConnection = async() => {

    mongoose.set('strictQuery', false);
    
        try {
            await mongoose.connect(process.env.DB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: false,
            
            });
            console.log('DB Online');
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la BD ver logs');
        }
    }
    module.exports = {
        dbConnection
    }
    