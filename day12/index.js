const { readFileByLine } = require("../helper")
const array = readFileByLine("input", 12)
const dirmap = {
    "N": { y: 1, x: 0 },
    "S": { y: -1, x: 0 },
    "E": { y: 0, x: 1 },
    "W": { y: 0, x: -1 },
    "L": "LEFT",
    "R": "RIGHT",
    "F": "FORWARD"
}
const digreesmap = {
    0: "N",
    90: "E",
    180: "S",
    270: "W",
}
let degrees = 90
let facing = "E"
let pos = { x: 0, y: 0 }
for (let line of array) {
    const d = line.match(/[A-Z]/g)[0]
    const amt = Number(line.match(/\d+/g)[0])
    const action = dirmap[d]
    if (action === "LEFT") {
        let newDigrees = degrees - amt
        while (newDigrees < 0)
            newDigrees = newDigrees + 360
        degrees = newDigrees
        facing = digreesmap[newDigrees]
    }
    else if (action === "RIGHT") {
        let newDigrees = degrees + amt
        while (newDigrees >= 360)
            newDigrees = newDigrees - 360
        degrees = newDigrees
        facing = digreesmap[newDigrees]
    }
    else if (action === "FORWARD") {
        moveShip(pos, facing, amt)
    } else {
        moveShip(pos, d, amt)
    }

}
console.log(pos)
//4663 too high
const part1 = Math.abs(pos.x) + Math.abs(pos.y)
console.log({ part1 })
function moveShip(pos, direction, amt) {
    console.log({ direction, amt, pos })
    const { x, y } = dirmap[direction]
    pos.x += x * amt
    pos.y += y * amt
}