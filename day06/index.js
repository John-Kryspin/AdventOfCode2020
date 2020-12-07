const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "06")

let currentgroup = []

let filteredAnswers = []
let count = 0
console.log(array)
for (let i = 0; i < array.length; i++) {
    const item = array[i].split("")
    console.log(item)
    if (!item[0]) {
        console.log({ currentgroup })
        const uniqueAnswers = [...new Set(currentgroup)]
        console.log(uniqueAnswers)
        filteredAnswers.push(uniqueAnswers)
        count += uniqueAnswers.length
        currentgroup = []
        continue
    }
    const answers = item
    currentgroup.push(...answers)


}
console.log(filteredAnswers)
console.log(count)