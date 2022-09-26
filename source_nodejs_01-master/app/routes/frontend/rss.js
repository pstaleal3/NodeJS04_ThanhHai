var express = require('express');
var router = express.Router();
const UtilsHelpers 	= require(__path_helpers + 'utils');
const {col_rss,col_menu,col_categories} = require(__path_configs + 'database');
const menuModel 		= require(__path_schemas + col_menu);
const categoryModel 		= require(__path_schemas + col_categories);
const folderView	 = __path_view_blog + 'pages/rss/';
const layout	     = __path_view_blog + 'frontend';
const rssModel 		= require(__path_schemas + col_rss);


/* GET home page. */
router.get('/',async (req, res, next) => {
  const listCategory = await categoryModel.find({status:'active'}).sort({ordering: 'asc'});
  const listMenu = await menuModel.find({status:'active'}).sort({ordering: 'asc'});
  const rssList = await rssModel.find({status:'active'}).select('name link');
  UtilsHelpers.mapDataRss(rssList).then(data => {
    res.render(`${folderView}index`, { 
      layout,
      listMenu,
      listCategory,
      rss: data
    });
  });
});

module.exports = router;
