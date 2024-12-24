const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to DB'))
        .catch(err => console.error(err));
}

module.exports = connectToDb;