const { readFileByLine } = require("../helper")
let array = readFileByLine("input", "11")
// console.log(array)

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

while (true) {
    y = 0
    let newMap = new Map()
    let modified = false
    for (const row of array) {
        let x = 0
        for (const seat of row) {
            //seat is empty
            const count = countAdjacentOccupied(x, y, map)
            if (map.get(`${x},${y}`) === "L") {
                if (count === 0){
                    newMap.set(`${x},${y}`, "#")
                    modified = true
                }else{
                    newMap.set(`${x},${y}`, "L")

                }

            } else if (map.get(`${x},${y}`) === "#") {
                if (count >= 4){
                    newMap.set(`${x},${y}`, "L")
                    modified = true
                }else{
                    newMap.set(`${x},${y}`, "#")

                }

            } else {
                newMap.set(`${x},${y}`, ".")
            }
            x++
        }
        y++
    }
    // console.log({newMap, modified})
    if(!modified)
        break

    map = newMap
}
let count = 0
map.forEach((seat)=>{
    if(seat ==="#")
        count++
})
console.log(count)
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
function isOccupied(x, y, map) {
    if (map.get(`${x},${y}`) === "#")
        return true
    return false
}