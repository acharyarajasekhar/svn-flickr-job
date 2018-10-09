module.exports = (data) => {
    return new Promise((resolve, reject) => {
        let filteredData = [];
        if (data && data.length > 0) {
            data.forEach((item) => {
                if (item && item.photos && item.photos.length > 0) {
                    let isFine = true;
                    item.photos.forEach((p) => {
                        if (!p.includes('sri-vaikhanasa-net.appspot.com')) {
                            isFine = false;
                        }
                    })
                    if (isFine) filteredData.push(item);
                    else console.error("ERROR: Issue with gallery item: " + JSON.stringify(item));
                }
                else {
                    console.error("ERROR: Issue with gallery item: " + JSON.stringify(item));
                }
            });
            if (filteredData.length > 0) resolve(filteredData);
            else reject({ reason: "No entries in gallery collection to process" });
        } else {
            reject({ reason: "No entries in gallery collection to process" });
        }
    });
}