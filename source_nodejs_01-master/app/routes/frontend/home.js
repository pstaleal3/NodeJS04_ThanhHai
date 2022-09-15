var express = require('express');
var router = express.Router();
const {col_articles,col_categories} = require(__path_configs + 'database');
const articlesModel 		= require(__path_schemas + col_articles);
const categoryModel 		= require(__path_schemas + col_categories);
const folderView	 = __path_view_blog + 'pages/home/';
const layout	     = __path_view_blog + 'frontend';
/* GET home page. */
router.get('/',async (req, res, next) => {
  const listArticles = await articlesModel.find({}).limit(3);
  const listCategory = await categoryModel.find({}).sort({ordering: 'desc'});
  res.render(`${folderView}index`, { 
    layout,
    listArticles,
    listCategory
  });
});

module.exports = router;
