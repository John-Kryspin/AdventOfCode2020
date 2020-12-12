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
let waypointPos = { x: 10, y: 1 }
for (let line of array) {
    const d = line.match(/[A-Z]/g)[0]
    const amt = Number(line.match(/\d+/g)[0])
    const action = dirmap[d]
    if (action === "LEFT") {
        let newDigrees = amt
        let calculatedWaypoint = { ...waypointPos }

        while (newDigrees !== 0) {
            newDigrees = newDigrees - 90
            let tempWaypoint = {}
            tempWaypoint.x = -(calculatedWaypoint.y - pos.y) + pos.x
            tempWaypoint.y = (calculatedWaypoint.x - pos.x) + pos.y
            calculatedWaypoint = tempWaypoint
        }
        waypointPos = calculatedWaypoint

    }
    else if (action === "RIGHT") {
        let newDigrees = amt
        let calculatedWaypoint = { ...waypointPos }
        while (newDigrees !== 0) {
            newDigrees = newDigrees - 90
            let tempWaypoint = {}
            tempWaypoint.x = (calculatedWaypoint.y - pos.y) + pos.x
            tempWaypoint.y = -(calculatedWaypoint.x - pos.x) + pos.y
            calculatedWaypoint = tempWaypoint
        }
        waypointPos = calculatedWaypoint
    }
    else if (action === "FORWARD") {
        moveShip(pos, waypointPos, amt)

    } else {
        moveWayPoint(waypointPos, d, amt)
    }
    console.log(pos)
}
//28290 too low
const part2 = Math.abs(pos.x) + Math.abs(pos.y)
console.log({ part2 })
function moveWayPoint(waypointPos, direction, amt) {
    const { x, y } = dirmap[direction]
    waypointPos.x += x * amt
    waypointPos.y += y * amt
}
function moveShip(pos, waypointPos, amt) {
    const goRightAmt = waypointPos.x - pos.x
    const goUpAmt = waypointPos.y - pos.y
    pos.x += goRightAmt * amt
    pos.y += goUpAmt * amt
    waypointPos.x = pos.x + goRightAmt
    waypointPos.y = pos.y + goUpAmt
}