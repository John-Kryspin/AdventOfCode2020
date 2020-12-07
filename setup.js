const session = require("./secrets.json").session
const axios = require('axios').default
const args = process.argv.slice(2)
const fs = require("fs")
const { exec } = require('child_process');
let path = require('path')
// node setup.js 7
console.log(args[0])
let day = args[0]
axios.get(`https://adventofcode.com/2020/day/${day}/input`, { headers: { Cookie: `session=${session}` } })
    .then((res) => {
        console.log(res.data)
        day = String(Number(day))
        const zeroday = day.padStart(2, "0")
        exec(`mkdir day${zeroday}`, () => {
            fs.writeFileSync(path.join(__dirname, "day" + zeroday, "input"), res.data)
            fs.writeFileSync(path.join(__dirname, "day" + zeroday, "index.js"), Buffer.from(
                `const { readFileByLine } = require("../helper")
const array = readFileByLine("input", ${zeroday})
console.log(array)`))
        })
    }).catch((err) => {
        console.log(err)
    })