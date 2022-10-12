var express = require('express');
var router = express.Router();

const folderView	 = __path_view_blog + 'pages/home/';
const layout	     = __path_view_blog + 'frontend';

/* GET home page. */
router.get('/',async (req, res, next) => {
  res.render(`${folderView}index`, { 
    layout,
  });
});

module.exports = router;
