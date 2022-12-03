const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const elves = input.split("\n\n")

const elves_sum = elves.map(e => {
    const nums = e.split("\n").map(n => Number(n)).reduce((a, b) => a + b)
    return nums
}).sort((a, b) => b - a)

console.log(elves_sum[0] + elves_sum[1] + elves_sum[2])