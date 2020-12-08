const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "08")
console.log(array)
let map = new Map()
let opIndex = 0
let accumulator = 0
for (let i = 0; i < array.length; i++) {
    const line = array[i]
    map.set(i, { visited: false, op: line.substring(0, 3), relative: line.substring(4, 5) === "+", number: Number(line.match(/\d+/g)[0]) })
}
let foundLoop = false
while (!foundLoop) {
    console.log({ opIndex })
    const currOp = map.get(opIndex)
    console.log({ currOp })
    if (currOp.visited) {
        foundLoop = true
        console.log({ accumulator })
        break;
    }
    map.set(opIndex, { ...map.get(opIndex), visited: true })
    if (currOp.op === "nop") {
        opIndex++

    }
    if (currOp.op === "jmp") {
        if (currOp.relative) {
            opIndex = opIndex + currOp.number
        } else {
            opIndex = opIndex - currOp.number
        }
    }
    if (currOp.op === "acc") {
        opIndex++
        if (currOp.relative) {
            accumulator += currOp.number
        } else {
            accumulator -= currOp.number
        }
    }
    console.log("end op index:" + opIndex)
}
console.log({ accumulator })