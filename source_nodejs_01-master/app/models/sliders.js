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
		if(Object.keys(restParams).length != 0) return Model.updateOne({_id: id}, restParams);
		return Model.updateOne({_id: id}, {[field]: value});
	},
	updateMany(arrayId,field,value,operator = '$in') {
		return Model.updateMany({_id: {[operator]: arrayId }}, {[field]: value});
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