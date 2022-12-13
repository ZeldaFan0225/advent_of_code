const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

const pairs = input.split("\n\n").map(r => r.split("\n").map(r => JSON.parse(r)))

console.log(pairs)

function checkPackageOrder(value_1, value_2) {
    if(typeof value_2 === "undefined") return false
    if(typeof value_1 === "undefined") return true
    if(Array.isArray(value_1) && typeof value_2 === "number") value_2 = [value_2]
    if(Array.isArray(value_2) && typeof value_1 === "number") value_1 = [value_1]
    if(typeof value_1 === "number" && typeof value_2 === "number") return value_1 < value_2;
    if(compareArrays(value_1, value_2)) return true;
}

function compareArrays(arr_1, arr_2) {
    let len_1 = arr_1.length
    let len_2 = arr_2.length
    let len = len_1 > len_2 ? len_1 : len_2
    let res = []
    for(let i = 0; i < len; ++i) {
        res.push(checkPackageOrder(arr_1[i], arr_2[i]))
        if(res.find(v => v)) break;
    }
    console.log(res)
    if(res.some(v => v)) return true;
    else return false;
}

const results = pairs.map(p => compareArrays(p[0], p[1]))

console.log(results)