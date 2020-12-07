const { readFileByLine } = require("../helper")
const array = readFileByLine("input", "04")

let currentPassport = {}
let validPassports = 0
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

console.log(array)
for (let i = 0; i <= array.length; i++) {
    const item = array[i]
    if (!item || item[0] === "") {
        if (isValid(currentPassport))
            validPassports++
        currentPassport = {}
        continue
    }
    const keyvalues = item.split(" ")
    for (const keyvalue of keyvalues) {
        const [key, value] = keyvalue.split(":")
        currentPassport[key] = value
    }


}
// console.log(passportsRaw)
console.log({ validPassports })
function isValid(passport) {
    // console.log(passport)
    for (const field of requiredFields) {
        // console.log({ field, given: passport[field] })
        if (!passport[field])
            return false
        if (!validateField(field, passport[field]))
            return false
    }
    return true

}
function validateField(field, value) {
    let status = true
    if (field === "byr") {
        if (Number(value) < 1920 || Number(value) > 2002)
            status = false
    }
    if (field === "iyr") {
        if (Number(value) < 2010 || Number(value) > 2020)
            status = false
    }
    if (field === "eyr") {
        if (Number(value) < 2020 || Number(value) > 2030)
            status = false
    }
    if (field === "hgt") {
        if (value.includes("cm")) {
            const height = value.substring(0, value.indexOf("cm"))
            if (height < 150 || height > 193)
                status = false
        } else if (value.includes("in")) {
            const height = value.substring(0, value.indexOf("in"))
            if (height < 59 || height > 76)
                status = false
        } else {
            status = false
        }
    }
    if (field === "hcl") {
        if (value[0] !== "#")
            status = false
        const haircolor = value.substring(1)
        if (haircolor.length !== 6)
            status = false
        for (const char of haircolor) {
            if (!is_numeric(char) && !is_valid_char(char))
                status = false
        }
    }
    if (field === "ecl") {
        if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value))
            status = false
    }
    if (field === "pid") {
        if (!/^\d{9}$/.test(value))
            status = false
    }
    console.log({ value, field, status })
    return status
}
function is_numeric(str) {
    return /^\d+$/.test(str);
}
function is_valid_char(str) {
    return /[a-f]+/.test(str)
}