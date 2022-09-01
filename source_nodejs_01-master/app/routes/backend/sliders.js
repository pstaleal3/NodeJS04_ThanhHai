var express = require('express');
var router 	= express.Router();
const util = require('util');
const { body, validationResult } = require('express-validator');

const Collection = 'sliders';
const systemConfig  = require(__path_configs + 'system');
const notify  		= require(__path_configs + 'notify');
const Model 		= require(__path_models + Collection);
const SlidersModel 	= require(__path_schemas + Collection);
// const ValidateSliders	= require(__path_validates + 'sliders');
const UtilsHelpers 	= require(__path_helpers + 'utils');
const ParamsHelpers = require(__path_helpers + 'params');

const linkIndex		 = '/' + systemConfig.prefixAdmin + `/${Collection}/`;
const pageTitleIndex = Collection + ' Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views + `pages/${Collection}/`;

// List items
router.get('(/status/:status)?', async (req, res, next) => {
	let objWhere	 = {};
	let keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
	let currentStatus= ParamsHelpers.getParam(req.params, 'status', 'all'); 
	let statusFilter = await UtilsHelpers.createFilterStatus(currentStatus,Collection);

	let pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 4,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};

	if(currentStatus !== 'all') objWhere.status = currentStatus;
	if(keyword !== '') objWhere.name = new RegExp(keyword, 'i');
	pagination.totalItems = await Model.countRow(objWhere);

	Model
		.getList(objWhere,pagination)
		.then( (items) => {
			res.render(`${folderView}list`, { 
				pageTitle: pageTitleIndex,
				items,
				statusFilter,
				pagination,
				currentStatus,
				keyword
			});
		});
});
// ajax
router.post('/ajax', (req, res, next) => {
	let {id, field, value} = req.body;
	SlidersModel.updateOne({_id: id}, {[field]: value}, (err, result) => {});
	res.send('success');
});
// Change status - Multi
router.post('/change-status/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	SlidersModel.updateMany({_id: {$in: req.body.cid }}, {status: currentStatus}, (err, result) => {
		req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.n) , false);
		res.redirect(linkIndex);
	});
});

// Change ordering - Multi
router.post('/change-ordering', (req, res, next) => {
	let cids 		= req.body.cid;
	let orderings 	= req.body.ordering;
	
	if(Array.isArray(cids)) {
		cids.forEach((item, index) => {
			SlidersModel.updateOne({_id: item}, {ordering: parseInt(orderings[index])}, (err, result) => {});
		})
	}else{ 
		SlidersModel.updateOne({_id: cids}, {ordering: parseInt(orderings)}, (err, result) => {});
	}

	req.flash('success', notify.CHANGE_ORDERING_SUCCESS, false);
	res.redirect(linkIndex);
});

// Delete
router.get('/delete/:id', (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 	
	SlidersModel.deleteOne({_id: id}, (err, result) => {
		req.flash('success', notify.DELETE_SUCCESS, false);
		res.redirect(linkIndex);
	});
});

// Delete - Multi
router.post('/delete', (req, res, next) => {
	SlidersModel.remove({_id: {$in: req.body.cid }}, (err, result) => {
		req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.n), false);
		res.redirect(linkIndex);
	});
});

// FORM
router.get(('/form(/:id)?'), (req, res, next) => {
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let item	= {name: '', ordering: 0, status: 'novalue'};
	let errors   = null;
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, errors});
	}else { // EDIT
		SlidersModel.findById(id, (err, item) =>{
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, errors});
		});	
	}
});

// SAVE = ADD EDIT
router.post('/save', 
	body('name').isLength({ min: 5 }).withMessage('name 5 ky ty'),
	body('ordering').isNumeric().withMessage('Ordering phai la so'),
	body('status').not().isIn(['novalue']).withMessage('Status khac gia tri mac dinh'),
	(req, res, next) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let errorsMsg = {};
		errors.errors.forEach(value => {
			errorsMsg[value.param] = value.msg
		});
		res.render(`${folderView}form`, { 
			pageTitle: pageTitleEdit, 
			item: req.body,
			errors: errorsMsg
		});
		return;
	} 
	let item = Object.assign(req.body);
	if(item.id){	// edit	
		SlidersModel.updateOne({_id: item.id}, {
			ordering: parseInt(item.ordering),
			name: item.name,
			status: item.status
		}, (err, result) => {
			req.flash('success', notify.EDIT_SUCCESS, linkIndex);
		});
	} else { // add
		new SlidersModel(item).save().then(()=> {
			req.flash('success', notify.ADD_SUCCESS, linkIndex);
		})
	}	
		
});

module.exports = router;
