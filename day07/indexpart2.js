const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "07")
console.time()
let bagMap = new Map();
for (const words of array) {
    const key = words.substring(0, words.indexOf(" bag"))
    // console.log(key)
    const itemsWords = words.substring(words.indexOf("contain") + 8)
    // console.log(itemsWords)
    const bags = itemsWords.split(",")
    let items = [];
    for (let item of bags) {
        item = item.trim()
        const number = item.match(/\d/gm)
        const nextBag = item.substring(item.indexOf(" ") + 1, item.indexOf(" bag"))
        // console.log({ item, nextBag })

        const isEnd = !number
        if (isEnd)
            continue
        items.push({ amount: number[0], nextBag: nextBag })
    }
    bagMap.set(key, [...items])
}

let bagsInside = 0
const key = "shiny gold"

drillDown(key, 1)
function drillDown(key, multiplyer) {
    const bags = bagMap.get(key)
    for (const bag of bags) {
        if (bag.nextBag === "other")
            continue
        bagsInside = bagsInside + (multiplyer* Number(bag.amount))
        console.log({multiplyer})
        drillDown(bag.nextBag, multiplyer*bag.amount)
    }
}
console.timeEnd()
console.log({ bagsInside })