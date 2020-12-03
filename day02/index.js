const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "02")
console.log(array)
let validPasswordCount = 0
for (const item of array) {
    const parts = item.split(" ")
    const [min, max] = parts[0].split("-").map(Number)
    const letter = parts[1][0]
    const password = parts[2]
    let lettersMap = {}
    function isValid() {
        for (const currLetter of password) {
            if (!lettersMap[currLetter]) {
                lettersMap[currLetter] = 1
            } else {
                lettersMap[currLetter] += 1
            }
        }
        if (lettersMap[letter] <= max && lettersMap[letter] >= min)
            return true
        return false
    }

    if (isValid()) {
        console.log({ password, min, max, lettersMap, letter })
        console.log("valid")
        validPasswordCount += 1
    } else {
        console.log({ password, min, max, lettersMap, letter })
        console.log("INVALID")
    }


}
console.log(validPasswordCount)