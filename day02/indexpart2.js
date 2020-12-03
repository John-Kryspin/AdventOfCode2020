const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "02")
console.log(array)
let validPasswordCount = 0
for (const item of array) {
    const parts = item.split(" ")
    const [pos1, pos2] = parts[0].split("-").map(Number)
    const letter = parts[1][0]
    const password = parts[2]
    let lettersMap = {}
    function isValid() {
        let count = 0
        if (password[pos1 - 1] === letter)
            count++
        if (password[pos2 - 1] === letter)
            count++
        return count === 1
    }

    console.log({ pos1, pos2, password, letter })
    if (isValid()) {
        console.log("valid")
        validPasswordCount += 1
    } else {
        console.log("INVALID")
    }


}
console.log(validPasswordCount)