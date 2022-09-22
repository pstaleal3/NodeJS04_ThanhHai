var express = require('express');
var router = express.Router();
const UtilsHelpers 	= require(__path_helpers + 'utils');
const {col_articles,col_categories,col_rss,col_menu} = require(__path_configs + 'database');
const articlesModel 		= require(__path_schemas + col_articles);
const categoryModel 		= require(__path_schemas + col_categories);
const menuModel 		= require(__path_schemas + col_menu);
const folderView	 = __path_view_blog + 'pages/home/';
const layout	     = __path_view_blog + 'frontend';
const rssModel 		= require(__path_schemas + col_rss);

// (async () => {
//   const rssList = await rssModel.find({status:'active'}).select('name link');
//   UtilsHelpers.mapDataRss(rssList).then(data => {
//     console.log(data)
//   });
// })();

/* GET home page. */
router.get('/',async (req, res, next) => {
  const listArticles = await articlesModel.find({}).limit(3);
  const listCategory = await categoryModel.find({status:'active'}).sort({ordering: 'asc'});
  const listMenu = await menuModel.find({status:'active'}).sort({ordering: 'asc'});
  res.render(`${folderView}index`, { 
    layout,
    listArticles,
    listCategory,
    listMenu
  });
});

module.exports = router;
