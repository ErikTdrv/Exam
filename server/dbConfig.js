const mongoose = require('mongoose');

async function initDatabase(){
    return await mongoose.connect('mongodb://127.0.0.1:27017/profile-settings')
}
module.exports = initDatabase;