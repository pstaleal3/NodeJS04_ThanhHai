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
	},
	updateOne({id,field,value,...restParams} = {}){
		if(!field) return Model.updateOne({_id: id}, restParams);
		return Model.updateOne({_id: id}, {[field]: value,...restParams});
	},
	updateMany({cid,...restParams},field,value,operator = '$in') {
		return Model.updateMany({_id: {[operator]: cid }}, {[field]: value,...restParams});
	},
	addOne(obj){
		return new Model(obj).save();
	},
	deleteOne(id){
		return Model.deleteOne({_id: id});
	},
	deleteMulti(arrayId){
		return Model.remove({_id: arrayId});
	}
}