module.exports = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let downloads = [];
            data.forEach(item => {
                let gItem = { id: item.id, photos: [] };
                item.photos.forEach(p => {
                    let fileId = p.substring(p.lastIndexOf('photos%2F') + 'photos%2F'.length, p.lastIndexOf('?alt=media'));
                    gItem.photos.push({ fileUrl: p, fileId: fileId })
                })
                downloads.push(gItem);
            })
            resolve(downloads);
        }
        catch (err) {
            reject(err);
        }
    });
}