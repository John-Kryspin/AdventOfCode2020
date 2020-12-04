let fs = require('fs')
let path = require('path')
module.exports = {
    readFileByLine(filename, day) {
        const file = fs.readFileSync(__dirname + "\\day" + day + "\\" + filename)
        return file.toString().split("\r\n");
    },
    readFileByLineSpace(filename, day) {
        const file = fs.readFileSync(__dirname + "\\day" + day + "\\" + filename)
        return file.toString().split(`\r\n`);
    }
}