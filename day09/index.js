const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "09")
console.log(array)

let preambleLength = 25

let preamble = array.splice(0, preambleLength)
console.log(preamble)

let magicNumber = 258585477
let index = 0
for (const num of array) {
    let valid = false
    console.log({ num })
    for (const numPre of preamble) {
        console.log(preamble)
        if (preamble.includes(String(Number(num) - Number(numPre)))) {
            valid = true
            break;
        }
    }
    if (!valid) {
        console.log({ valid, num, index })
        break
    }
    preamble.shift()
    preamble.push(num)
    index++
}



//answer2
const array2 = readFileByLine("input", "09")
let preambleCopy = array2.splice(0, preambleLength)

index = 0
for (const num of array2) {


    const answer = findMatch(preambleCopy)
    if (answer) {
        console.log("DONE")
        console.log(answer)
        return
    }
    preambleCopy.shift()
    preambleCopy.push(num)
    index++
}
//35971164
function findMatch(preambleCopy) {
    let tempPreamble = [...preambleCopy]
    let found = false
    for (let i = 0; i <= preambleCopy.length; i++) {

        let sum = 0
        for(const j in tempPreamble){
            const curr = tempPreamble[j]
            if (sum === magicNumber) {
                tempPreamble = tempPreamble.splice(0, index)
                const sorted = tempPreamble.sort((a, b) => a - b)
                return {answer:+sorted[0] + +sorted[sorted.length - 1], tempPreamble, sum }
            }
            sum += +curr
        
        }
        tempPreamble.unshift()
    }
    return found
}