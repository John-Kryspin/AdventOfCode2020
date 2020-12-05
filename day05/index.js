const { readFileByLine } = require('../helper')
const array = readFileByLine("input", "05")
console.log(array)
let seatMax = 0
for (const group of array) {
    const rows = { min: 0, max: 127, moves: group.substring(0, 7), lowerIndicator: "F" }
    const row = parseInput(rows)
    const columns = { min: 0, max: 7, moves: group.substring(7), lowerIndicator: "L" }
    const column = parseInput(columns)
    const seatID = row.min * 8 + column.min
    console.log({ row, column, seatID })
    seatMax = Math.max(seatMax, seatID)
    // const column = findColumn(group)
}
console.log({ seatMax })

function parseInput(range) {
    for (const move of range.moves) {
        if (move === range.lowerIndicator) {
            //lower half, keep min same, 
            const diff = range.max - range.min
            const move_amount = Math.round(diff / 2)
            range.max = range.max - move_amount
        } else {
            //upper half, keeep max same
            const diff = range.max - range.min
            const move_amount = Math.round(diff / 2)
            range.min = range.min + move_amount
        }
    }
    return range
}
function findColumn(group) {
    const moves = group.substring(7)
}