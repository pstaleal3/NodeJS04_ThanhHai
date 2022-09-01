var express = require('express');
var router = express.Router();
const {countCollection} 	= require(__path_helpers + 'utils');
const folderView	 = __path_views + 'pages/dashboard/';
const ItemsModel 	= require(__path_schemas + 'items');
const SlidersModel 	= require(__path_schemas + 'sliders');
const UsersModel 	= require(__path_schemas + 'users');
/* GET dashboard page. */
router.get('/', async(req, res, next) => {
	let collectionModel = {
		'Sliders': SlidersModel,
		'Items': ItemsModel,
		'Users': UsersModel,
	};
	collectionModel = await countCollection(Object.keys(collectionModel),collectionModel);
	res.render(`${folderView}index`, { 
		pageTitle: 'Dashboard Page', 
		count: collectionModel
	});
});

module.exports = router;
