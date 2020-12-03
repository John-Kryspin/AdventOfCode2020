const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "03")
const perLine = array[0].length
console.log({ perLine })

const directions = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, { x: 1, y: 2 }]
let treesEncounteredTotal = []

console.time()
for (const { x, y } of directions) {
    const currentPos = { x: 0, y: 0 }

    let treesEncountered = 0
    for (let i = 0; i < array.length; i += y) {
        const row = array[i]
        const line = row.split("")
        // currentPos.x = 35

        currentPos.x = getXPos(currentPos.x)
        if (line[currentPos.x] === "#") {
            treesEncountered++
            console.log("Found Tree: ", { currentPos })
        }
        console.log(currentPos)
        currentPos.x += x
        currentPos.y += y
    }
    treesEncounteredTotal.push(treesEncountered)
}
console.log(treesEncounteredTotal)
console.log(treesEncounteredTotal.reduce((prev, curr) => { return prev * curr }, 1))
console.timeEnd()

function getXPos(xPos) {
    return xPos % perLine
}