const Model = require(__path_schemas + 'sliders');
module.exports = {
	getList(objWhere, pagination) {
		return Model
			.find(objWhere)
			.sort({_id: 'desc'})
			.skip((pagination.currentPage-1) * pagination.totalItemsPerPage)
			.limit(pagination.totalItemsPerPage)
	},	
	countRow(objWhere) {
		return Model.count(objWhere).then(data => data);
	}
}