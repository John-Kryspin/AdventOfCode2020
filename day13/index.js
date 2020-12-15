const { readFileByLine } = require("../helper")
const array = readFileByLine("input", 13)
const earliestTime = Number(array[0])

let busIDs = array[1].split(",").filter((item) => !isNaN(Number(item))).map(Number)
console.log(earliestTime)
console.log(busIDs)
//loopthru times
let i = 0
while (true) {
    //loop thru multipliyes against target
    for (let j = 0; j < busIDs.length; j++) {
        if ((earliestTime + i) % busIDs[j] === 0) {
            console.log({ busID: busIDs[j], minutes: i })
            console.log({ ans: i * busIDs[j] })
            return
        }
    }
    i++
}