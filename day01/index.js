const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "01")
let match = {}
const { number, number2, number3 } = getMatches()
const answer = getAnswer(number, number2, number3)
console.log({ answer })



function getMatches() {
    for (const number of array) {
        if (match[number] && match[number].found)
            return match[number]
        for (const number2 of array) {
            const number3 = 2020 - number2 - number
            match[number3] = { found: true, number, number2, number3 }

        }
    }
}
function getAnswer(number, number1, number2) {
    return number * number1 * number2
}