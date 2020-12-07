const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "07")
console.log(array)
let bagMap = new Map();
for(const words of array){
    const key = words.substring(0, words.indexOf(" bag"))
    // console.log(key)
    const itemsWords = words.substring(words.indexOf("contain") +8)
    // console.log(itemsWords)
    const bags = itemsWords.split(",")
    let items =[];
    for(let item of bags){
        item=item.trim()
        const number = item.match(/\d/gm)
        const nextBag = item.substring(item.indexOf(" ") +1, item.indexOf(" bag"))
        console.log({item, nextBag})

        const isEnd = !number
        if(isEnd)
            continue
        items.push({amount:number[0], nextBag: nextBag})
    }
    bagMap.set(key, [...items])
}
console.log(bagMap.get("muted yellow"))

let shinyBagsFound = 0
for(const words of array){
    const key = words.substring(0, words.indexOf(" bag"))
    let found = false
    drillDown(key)
    function drillDown(key){
        if(found)
            return
        const bags = bagMap.get(key)
        for(const bag of bags){
            if(bag.nextBag==="other")
                continue
            if(bag.nextBag==="shiny gold"){
                found=true
                shinyBagsFound++
                return
            }
            drillDown(bag.nextBag)
        }
    }
}

console.log(shinyBagsFound)