let fs = require('fs')
let path = require('path')
var endOfLine = require('os').EOL;

module.exports = {
    readFileByLine(filename, day) {
        const file = fs.readFileSync(path.join(__dirname, "day" + day, filename))
        return file.toString().split(endOfLine);
    }
}