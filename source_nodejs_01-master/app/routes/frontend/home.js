var express = require('express');
var router = express.Router();
const articlesModel 		= require(__path_schemas + 'articles');
const folderView	 = __path_view_blog + 'pages/home/';
const layout	     = __path_view_blog + 'frontend';
/* GET home page. */
router.get('/',async (req, res, next) => {
  const listArticles = await articlesModel.find({}).limit(3);
  res.render(`${folderView}index`, { 
    layout,
    listArticles
  });
});

module.exports = router;
