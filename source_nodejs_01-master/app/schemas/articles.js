const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    title: String, 
    slug: String, 
    thumbnail: String, 
    description: String,
    status: String,
    ordering: Number,
    categoriesId: String
},{ timestamps: true });

module.exports = mongoose.model(databaseConfig.col_articles, schema );