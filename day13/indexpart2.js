const { readFileByLine } = require("../helper")
const array = readFileByLine("input", 13)


//this problem was dumb and I looked it up online
//I hope there are not more questions like this this year
function solveMMI(a, mod) {
    const b = a % mod;
    for (let x = 1n; x < mod; x++) {
        if ((b * x) % mod === 1n) {
            return x;
        }
    }
    return 1n;
}


function solveCRT(system) {
    const prod = system.reduce((acc, con) => acc * con.busID, 1n);
    return system.reduce((acc, con) => {
        const p = prod / con.busID;
        return acc + (con.a * solveMMI(p, con.busID) * p);
    }, 0n) % prod;
}
let busIDs = array[1].split(",")
    .map((id, i) => ({ id, i }))
    .filter(eq => eq.id !== 'x')
    .map(eq => {
        const busID = parseInt(eq.id.trim());
        return {
            busID: BigInt(busID),
            i: eq.i,
            a: BigInt(busID - eq.i)
        };
    });
// console.log(e/arliestTime)
console.log(busIDs)
const solution = solveCRT(busIDs)
console.log({ solution })
