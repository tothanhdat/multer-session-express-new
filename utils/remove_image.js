const fs = require('fs');
const removeImage = (imagePathRemove, users, indexFinded) => {
    return new Promise(resolve => {
        try {
            fs.unlink(imagePathRemove, err => {
                if (err) resolve({ err: true, message: err.message })
                console.log(`remove file successed`);
                users.splice(indexFinded, 1);
                return resolve({ error: false, message: 'remove successed'})
            })
        } catch (error) {
                return resolve({ error: true, message: error.message })
        }
    })
}
exports.REMOVE_IMAGE = removeImage;