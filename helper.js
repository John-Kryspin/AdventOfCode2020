let fs = require('fs')
let path = require('path')
var endOfLine = require('os').EOL;

module.exports = {
    readFileByLine(filename, day, map) {
        const file = fs.readFileSync(path.join(__dirname, "day" + day, filename))
        if (!map)
            return file.toString().split(endOfLine)
        return file.toString().split(endOfLine).map(map)

    }
}