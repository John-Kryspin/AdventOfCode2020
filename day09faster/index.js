const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "09faster", (item) => Number(item))
const PRE_LENGTH = 25
for (let i = PRE_LENGTH; i < array.length; i++) {
    const valid = isValid(array.slice(i - PRE_LENGTH, i), array[i])
    if (!valid) break;
}
function isValid(pre, target) {
    const predicates = []
    for (const val of pre) {
        if (predicates.includes(val))
            return true
        predicates.push(target - val)
    }
    console.log("Part 1", target)
    return false
}
const MAGIC_NUMBER = 258585477

for (let i = PRE_LENGTH; i < array.length; i++) {
    const ans = findMatch(array.slice(i - PRE_LENGTH, i), array[i])
    if (ans) {
        console.log("Part 2", Math.max(...ans.pre) + Math.min(...ans.pre))
        break;
    }

}
function findMatch(pre) {
    for (let i = 0; i < pre.length; i++) {
        let counter = 0
        for (const val of pre) {
            counter += val
            if (counter === MAGIC_NUMBER) {
                return { pre, counter }
            }
        }

    }
    return false
}