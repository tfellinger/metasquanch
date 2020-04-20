const
    fs = require("fs-extra"),
    path = require("path");

const copyToDownload = async sessionId => {
    let absolutePathUpload = path.join(process.env.UPLOAD_PATH, sessionId);
    let absolutePathDownload = path.join(process.env.DOWNLOAD_PATH, sessionId);
    try {
        await fs.mkdirp(path.join(process.env.DOWNLOAD_PATH, sessionId));
        await fs.copy(absolutePathUpload, absolutePathDownload);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    copyToDownload
};