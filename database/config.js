const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useUnifiedTopology: true,
        });

        console.log('Connected to Mongoose database');

    } catch(error){
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }
}


module.exports = {
    dbConnection
}

