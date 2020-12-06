const { readFileByLineSpace } = require("../helper")
const array = readFileByLineSpace("input", "06")

let currentgroup = []

let filteredAnswers = []
let count = 0
console.log(array)
let firstRun = true
for (let i = 0; i < array.length; i++) {
    const item = array[i].split("")
    console.log(item)
    if (!item[0]) {
        const uniqueAnswers = [...new Set(currentgroup)]
        filteredAnswers.push(uniqueAnswers)
        count += uniqueAnswers.length
        currentgroup = []
        firstRun = true
        continue
    }
    const answers = item
    if (currentgroup.length === 0 && firstRun)
        currentgroup.push(...answers)
    else {
        currentgroup = currentgroup.filter((value) => {
            return answers.includes(value)
        })
    }
    firstRun = false



}
console.log(filteredAnswers)
console.log(count)