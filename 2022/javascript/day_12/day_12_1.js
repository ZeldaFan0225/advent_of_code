const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

let start = "0|0"
let destination = "0|0"

function getHeight(letter) {
    return letter.charCodeAt(0) - 96
}

const grid = input.split("\n").map((r, i) => r.split("").map((n, ii) => {
    if(n === "E") {
        destination = `${i}|${ii}`
        return 0
    }
    if(n === "S") {
        start = `${i}|${ii}`
        return 0
    }
    return getHeight(n)
}))

console.log(start)
console.log(destination)
console.log(grid)