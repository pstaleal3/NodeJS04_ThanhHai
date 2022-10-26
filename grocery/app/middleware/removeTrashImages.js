const UtilsHelpers 	= require(__path_helpers + 'utils');
module.exports = (req, res, next) => {
    if(req.session.images) {
        let fileNames = req.session.images.join(',');
        UtilsHelpers.deleteImagesDropzone('products',fileNames)
    }
    next();
}