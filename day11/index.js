const { readFileByLine } = require("../helper")
let array = readFileByLine("input", "11")
// console.log(array)
const ROW_LENGTH = array[0].length
let map = new Map()

let y = 0
for (const row of array) {
    let x = 0
    for (const seat of row) {
        map.set(`${x},${y}`, seat)
        x++
    }
    y++
}

console.time()
while (true) {
    y = 0
    let newMap = new Map()
    let modified = false
    for (const row of array) {
        let x = 0
        for (const seat of row) {
            //seat is empty
            if (map.get(`${x},${y}`) === ".") {
                newMap.set(`${x},${y}`, ".")
                x++
                continue;
            }
            const count = countSeenOccupied(x, y, map)


            if (map.get(`${x},${y}`) === "L") {
                if (count === 0) {
                    newMap.set(`${x},${y}`, "#")
                    modified = true
                } else {
                    newMap.set(`${x},${y}`, "L")

                }

            } else if (map.get(`${x},${y}`) === "#") {
                if (count >= 5) {
                    newMap.set(`${x},${y}`, "L")
                    modified = true
                } else {
                    newMap.set(`${x},${y}`, "#")

                }
            }
            x++
        }
        y++
    }
    // console.log({newMap, modified})
    if (!modified)
        break

    map = newMap
}
const ans = [...map.values()].reduce((acc,curr)=>{
    if(curr === "#")
        return acc+=1
    return acc
},0)
console.log({ans})
console.timeEnd()
// console.log(map)
function countAdjacentOccupied(x, y, map) {
    let count = 0
    for (let i = -1; i < 2; i++) {
        isOccupied(x + i, y - 1, map) && count++
    }
    for (let i = -1; i < 2; i++) {
        if (i == 0)
            continue
        isOccupied(x + i, y, map) && count++
    }
    for (let i = -1; i < 2; i++) {
        isOccupied(x + i, y + 1, map) && count++
    }
    return count
}
function countSeenOccupied(x, y, map) {
    let count = 0
    //left
    // console.log("left")

    //left
    countRay(x, y, map, -1, 0) && count++
    //right
    countRay(x, y, map, 1, 0) && count++
    //up
    countRay(x, y, map, 0, -1) && count++
    //down
    countRay(x, y, map, 0, 1) && count++
    //upright
    countRay(x, y, map, 1, -1) && count++
    //downright
    countRay(x, y, map, 1, 1) && count++
    //downleft
    countRay(x, y, map, -1, 1) && count++
    //upleft
    countRay(x, y, map, -1, -1) && count++

    return count
}
function countRay(startX, startY, map, offX, offY) {
    // console.log({startX,startY,offX,offY})
    for (let x = startX + offX, y = startY + offY; x >= 0 && x < ROW_LENGTH && y >= 0 && y < array.length; x += offX, y += offY) {
        if (isEmptyChair(x, y, map)) return false
        if (isOccupied(x, y, map)) {
            return true
        }
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