const 
    metadataService = require('../services/metadataService'),
    uploadService = require('../services/uploadService'),
    fileService = require('../services/fileService'),
    compressionService = require('../services/compressionService');

const cleanFiles = async (req, res) => {
    const uploadedFiles = await uploadService.getUploadedFiles(req, res);
    if (uploadedFiles.length == 1 && req.session.filename == undefined) {
        req.session.filename = uploadedFiles[0].name;
        req.session.ultype = 'single';
        await metadataService.execQpdfLinearize(req.session.id);
        await metadataService.execExiftoolRemove(req.session.id);
        await metadataService.execQpdfLinearize(req.session.id);
        await fileService.copyToDownload(req.session.id);
    } else {
        await metadataService.execQpdfLinearize(req.session.id);
        await metadataService.execExiftoolRemove(req.session.id);
        await metadataService.execQpdfLinearize(req.session.id);
        await compressionService.compressFiles(uploadedFiles, req);
        req.session.ultype = 'multi';
    }
    await metadataService.execExiftoolShow(req.session.id);
    res.status(200).send();
}

module.exports = {
    cleanFiles
}