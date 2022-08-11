var express = require('express');
var router = express.Router();
// var helper = require('./../../helpers/ultis');
// var itemsModel = require('./../../schemas/items');
var systemConfig = require('./../../configs/system');
// const { body, validationResult } = require('express-validator');
var linkIndex = '/'+systemConfig.prefixAdmin+'/items';
var pageTitle = 'Items Management';
var pageAdd = pageTitle + ' - Add';
var pageEdit = pageTitle + ' - Edit';

router.get('/form',async function(req, res, next) {
  res.render('backend/pages/items/form', { title: 'Form Items' });
});
router.get('/',async function(req, res, next) {
  res.render('backend/pages/items/list', { title: 'list Items' });
});
/* GET home page. */
// router.get('(status/:status)?',async function(req, res, next) {
//   let currentStatus = req.params.status;
//   let keyword = req.query.search;
//   let statusFilter =await helper.createStatusFilter(currentStatus,keyword);
//   let currentPage = req.query.page ?? 1;
//   let pagination = {
//     totalItems:1,
//     totalItemsPerPage: 2,
//     currentPage,
//     pageRange: 3
//   }
  
//   let objWhere = (currentStatus == 'all' || !currentStatus) ? {} : {status: currentStatus};
//   if(keyword) objWhere = {...objWhere,name: new RegExp(keyword,'i')}
//   itemsModel.count(objWhere).then(data => {
//     pagination.totalItems = data;
//     itemsModel
//     .find(objWhere)
//     .limit(pagination.totalItemsPerPage)
//     .skip((pagination.currentPage - 1) * pagination.totalItemsPerPage)
//     .then((items) => {
//       res.render('pages/items/list', { 
//         title: 'list items',
//         items: items,
//         statusFilter: statusFilter,
//         currentStatus: !currentStatus ? 'all' : currentStatus,
//         keyword,
//         paginationObj: pagination,
//         sess : req.session.flash
//       });
//     });
//   });
  
// });
// router.get('/change-status/:id/:status', function(req, res, next) {
//   let id = req.params.id;
//   let status = req.params.status == 'active' ? 'inactive' : 'active';

//   itemsModel.updateOne({ _id: id }, { status: status }, function(err, response) {
//     req.flash('success', 'Change status success!', linkIndex)
//   });
// });
// router.post('/change-status/:status', function(req, res, next) {
//   let id = req.body.cid;
//   let status = req.params.status;
//   itemsModel.updateMany({ _id: {$in:id} }, { status: status }, function(err, response) {
//     req.flash('success', 'Cap nhat '+id.length+' phan tu ', linkIndex)
//   });
// });
// router.post('/delete', function(req, res, next) {
//   let id = req.body.cid;
//   itemsModel.deleteMany({ _id: {$in:id} }, function(err, response) {
//     res.redirect(linkIndex);
//   });
// });
// router.post('/change-ordering', function(req, res, next) {
//   let id = req.body.cid;
//   let ordering = req.body.ordering;
//   if(Array.isArray(id)) {
//     id.map((id, index) => {
//       itemsModel.updateOne({ _id: id }, { ordering: +ordering[index] }, (err, response) => {});
//     });
//   } else {
//     itemsModel.updateOne({ _id: id }, { ordering: ordering }, (err, response) => {
//     });
//   }
//   req.flash('success', 'Change status success!', linkIndex)
//   // res.redirect(linkIndex);
// });
// router.get('/delete/:id/', function(req, res, next) {
//   let id = req.params.id;
//   itemsModel.deleteOne({ _id: id }, function(err, response) {
//     res.redirect(linkIndex);
//   });
// });
// router.get('/form(/:id)?',(req, res, next) => {
//   let id = req.params.id;
//   let title = !id ? pageAdd : pageEdit;
//   let item = {name: '', ordering: '', status: ''};
  
//   if(id) {
//     itemsModel.findById(id, (err,item) => {
//       res.render('pages/items/add', { 
//         title,item,errors : null
//       });
//     });
//   } else {
//     res.render('pages/items/add', { 
//       title,item,errors : null
//     });
//   }
// });
// router.post(
//   '/save',
//   body('name').isLength({min:5}), 
//   body('ordering').isInt().withMessage('ordering'), 
//   body('status').custom((value,{req}) => value != 'novalue'), 
//   (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const item = req.body;
//     const title = pageAdd;
//     // return res.status(400).json({ errors: errors.array() });
//     res.render('pages/items/add', { 
//       item,errors,title
//     });
//   } else {
//     if(req.body.id == '') {
//       delete req.body.id;
//       itemsModel.create(req.body, (err,res) => {
//         req.flash('success', 'them phan tu thanh cong', linkIndex)
//       });
//     } else {
//       itemsModel.updateOne({ _id: req.body.id }, req.body, (err, res) => {
//         req.flash('success', 'cap nhat phan tu thanh cong', linkIndex)
//       });
//     }
//   }
  
// });
module.exports = router;
