const { readFileByLine } = require("../helper")
let array = readFileByLine("input", "10", Number)
// console.log(array)

let currJolt = 0
let diffs = { 1: 0, 3: 0 }
for (let i = 0; i < array.length; i++) {
    let nextJolts = [currJolt + 1, currJolt + 2, currJolt + 3]
    for (const nextJolt of nextJolts) {
        if (array.includes(nextJolt)) {
            const diff = nextJolt - currJolt
            // console.log({currJolt,nextJolt,diff})
            diffs[diff] += 1
            currJolt = nextJolt
            break
        }
    }
}
currJolt += 3
diffs['3'] += 1

// console.log(diffs)
const part1Answer = diffs['3'] * diffs['1']
console.log(part1Answer)

let jolts = [0]
let highest = 0
for (let i = 0; i < array.length; i++) {
    jolts.push(array[i])
    highest = Math.max(highest, array[i])
}
jolts.push(highest + 3)
jolts = jolts.sort((a, b) => a - b)
let ways = { 0: 1 }
for (let i = 1; i < jolts.length; i++) {
    //for the three before jolts before the current jolt, subtract x from their jolt value and get the current number of ways on that key
    //add upp all the ways and store as a key:value pair in ways at the number
    //basically if they are apart more than 3 the value will  not increase
    ways[jolts[i]] = getWay([jolts[i] - 1]) + (getWay([jolts[i] - 2])) + (getWay([jolts[i] - 3]))
}
function getWay(index) {
    if (isNaN(Number(ways[index]))) {
        return 0
    } else {
        return ways[index]
    }
    // if(ways[index])
}
console.log(ways[highest])
