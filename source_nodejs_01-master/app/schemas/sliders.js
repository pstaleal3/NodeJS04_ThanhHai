const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    src: String, 
    status: String,
    ordering: Number,
    created: {
        userId: Number,
        username: String,
        time: Date
    },
    modified: {
        userId: Number,
        username: String,
        time: Date
    },
    description: String,
});

module.exports = mongoose.model(databaseConfig.col_sliders, schema );