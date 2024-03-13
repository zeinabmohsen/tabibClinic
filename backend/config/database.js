const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('Connected to the database successfully');
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error);
        });
}

module.exports = dbConnect;
