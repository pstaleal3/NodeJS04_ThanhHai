const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    value: Number,
    quantity: Number,
    used: Number,
    from: Date,
    to: Date,
    status: String,
    
},{ timestamps: true });

module.exports = mongoose.model(databaseConfig.col_coupons, schema );