const { readFileByLine } = require("../helper")
let array = readFileByLine("input", "10", Number)
array.push(0)
array.push(Math.max(...array)+3)
array = array.sort((a,b)=>a-b)

let diffs = { 1: 0, 3: 0 }
for (let i = 0; i < array.length-1; i++) {
    const diff = array[i+1] - array[i]
    diffs[diff] += 1
}

// console.log(diffs)
const part1Answer = diffs['3'] * diffs['1']
console.log(part1Answer)

let jolts = [...array]

let ways = { 0: 1 }
for (let i = 1; i < jolts.length; i++) {
    const currJolt = jolts[i]
    //for the three before jolts before the current jolt, subtract x from their jolt value and get the current number of ways on that key
    //add upp all the ways and store as a key:value pair in ways at the number
    ways[currJolt] = getWay(currJolt - 1) + (getWay(currJolt - 2)) + (getWay(currJolt - 3))
}
function getWay(index) {
    if (!ways[index]) {
        return 0
    } else {
        return ways[index]
    }
}
console.log(ways[jolts[jolts.length-1]])
