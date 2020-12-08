const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "08")
function executeProgram(map) {
    let opIndex = 0
    let accumulator = 0
    let stack = []
    for (let i = 0; i < map.size; i++) {
        const currOp = map.get(opIndex)
        if (!currOp) {
            return { stack, accumulator, infiniteLoop: false, }
        }
        const { op, visited, number } = currOp
        stack.push(currOp)
        if (visited) {
            //stack
            return { stack, accumulator, infiniteLoop: true, }
        }
        map.set(opIndex, { ...map.get(opIndex), visited: true })
        if (op === "nop") {
            opIndex++
        }
        if (op === "jmp") {
            opIndex += number
        }
        if (op === "acc") {
            opIndex++
            accumulator += number
        }
    }
}

let map = new Map()
for (let i = 0; i < array.length; i++) {
    const line = array[i]
    map.set(i, { visited: false, op: line.substring(0, 3), number: parseInt(line.substring(4)) })
}


function findIncorrectOp() {
    for (let j = 0; j < array.length; j++) {
        let map = new Map()
        for (let i = 0; i < array.length; i++) {
            const line = array[i]
            const number = parseInt(line.substring(4))
            const op = line.substring(0, 3)
            if (j === i) {
                if (op === "jmp")
                    map.set(i, { visited: false, op: "nop", number })
                else if (op === "nop")
                    map.set(i, { visited: false, op: "jmp", number })
                else
                    map.set(i, { visited: false, op: op, number })

            } else {
                map.set(i, { visited: false, op: op, number })
            }
        }
        const answer = executeProgram(map)
        if (answer.infiniteLoop === false)
            return { answer, j }
    }
}


const part1 = executeProgram(map)
console.log(part1)
const part2 = findIncorrectOp()
console.log(part2)