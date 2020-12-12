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

let pos = { x: 0, y: 0 }
let waypointPos = { x: 10, y: 1 }
for (let line of array) {
    const d = line.match(/[A-Z]/g)[0]
    const amt = Number(line.match(/\d+/g)[0])
    const action = dirmap[d]
    if (action === "LEFT") {
        let wayPointCopy = { ...waypointPos }
        const modifier = amt / 90
        for (let i = 0; i < modifier; i++) {
            let tempWaypoint = {}
            tempWaypoint.x = -(wayPointCopy.y - pos.y) + pos.x
            tempWaypoint.y = (wayPointCopy.x - pos.x) + pos.y
            wayPointCopy = tempWaypoint
        }
        waypointPos = wayPointCopy

    }
    else if (action === "RIGHT") {
        let wayPointCopy = { ...waypointPos }
        const modifier = amt / 90
        for (let i = 0; i < modifier; i++) {
            let tempWaypoint = {}
            tempWaypoint.x = (wayPointCopy.y - pos.y) + pos.x
            tempWaypoint.y = -(wayPointCopy.x - pos.x) + pos.y
            wayPointCopy = tempWaypoint
        }
        waypointPos = wayPointCopy
    }
    else if (action === "FORWARD") {
        moveShip(pos, waypointPos, amt)

    } else {
        moveWayPoint(waypointPos, d, amt)
    }
}
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