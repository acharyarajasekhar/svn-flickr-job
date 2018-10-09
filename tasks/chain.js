const moment = require('moment');

module.exports = () => {
    console.log("Job started @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
    require('./step0.cleanup')()
        .then((data) => { return require('./step1.fetch')(data) })
        .then((data) => { return require('./step2.filter')(data) })
        .then((data) => { return require('./step3.predownload')(data) })
        .then((data) => { return require('./step4.download')(data) })
        .then((data) => { return require('./step5.preupload')(data) })
        .then((data) => { return require('./step6.upload')(data) })
        .then((data) => { return require('./step7.fetch')(data) })
        .then((data) => { return require('./step8.updateref')(data) })
        .then((data) => {
            console.log(JSON.stringify(data));
            console.log("Job finished @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
            process.exitCode = 0;
        })
        .catch(err => {
            if (err && err["reason"]) {
                console.log(err["reason"]);
                console.log("Job finished @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                process.exitCode = 0;
            }
            else {
                console.error(err);
                console.log("Job finished with errors @ " + moment().utcOffset("+05:30").format('YYYY-MM-DD hh:mm:ss a'));
                process.exitCode = 0;
            }
        });

}
