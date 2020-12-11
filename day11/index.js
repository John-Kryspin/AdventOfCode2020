const { readFileByLine } = require("../helper")
let array = readFileByLine("input", "11")
const ROW_LENGTH = array[0].length



function calculateCount(map, check, MATCH) {
    let modified = true
    while (modified) {
        modified = false
        let newMap = new Map(map)
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                const coord = `${x},${y}`
                const count = check(x, y, map)
                if (map.get(coord) === "L") {
                    if (count === 0) {
                        newMap.set(coord, "#")
                        modified = true
                    } 
                } else if (map.get(coord) === "#") {
                    if (count >= MATCH) {
                        newMap.set(coord, "L")
                        modified = true
                    } 
                }
            }
        }
        map = newMap
    }
    const ans = [...map.values()].reduce((acc, curr) => {
        if (curr === "#")
            return acc += 1
        return acc
    }, 0)
    return ans
}



// console.log(map)
function countAdjacentOccupied(x, y, map) {
    let count = 0
    for (let i = -1; i < 2; i++) {
        isOccupied(x + i, y - 1, map) && count++
        //skip the cell you are already on
        if (i !== 0)
            isOccupied(x + i, y, map) && count++

        isOccupied(x + i, y + 1, map) && count++
    }

    return count
}
function countSeenOccupied(x, y, map) {
    let count = 0

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            //skip 0,0, iterate through all directions
            if (!(j === 0 && i === 0)) {
                countRay(x, y, map, i, j) && count++
            }
        }
    }
    return count
}
function countRay(startX, startY, map, offX, offY) {
    // console.log({startX,startY,offX,offY})
    for (let x = startX + offX, y = startY + offY; x >= 0 && x < ROW_LENGTH && y >= 0 && y < array.length; x += offX, y += offY) {
        if (isEmptyChair(x, y, map)) return false
        if (isOccupied(x, y, map)) return true
    }
    return false
}
function isEmptyChair(x, y, map) {
    if (map.get(`${x},${y}`) === "L")
        return true
    return false
}
function isOccupied(x, y, map) {
    if (map.get(`${x},${y}`) === "#")
        return true
    return false
}
let map = new Map()

for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
        map.set(`${x},${y}`, array[y][x])
    }
}
console.time()
const part1Map = new Map(map)
const part1 = calculateCount(part1Map, countAdjacentOccupied, 4)
console.log({ part1 })
const part2Map = new Map(map)
const part2 = calculateCount(part2Map, countSeenOccupied, 5)
console.log({ part2 })
console.timeEnd()