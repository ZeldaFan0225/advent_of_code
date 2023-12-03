const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")
const gear_regex = /\*/g
const numbers_regex = /(\d+)/g
const before_number_regex = /\.{0,2}(\d+)$/
const after_number_regex = /^(\d+)\.{0,2}/

const gear_ratios = []

lines.forEach((l, row, arr) => {
    let match;
    while ((match = gear_regex.exec(l)) != null) {
        findAdjacent(row, arr, match.index)
    }
})

function findAdjacent(row, arr, index) {
    const nums = []
    const before_row = arr[row - 1].substring(index - 3, index + 4)
    if(before_row) nums.push(...getNumbersFromAdjacentRow(before_row))

    const after_row = arr[row + 1].substring(index - 3, index + 4)
    if(after_row) nums.push(...getNumbersFromAdjacentRow(after_row))

    const before_gear = arr[row].substring(index - 3, index)
    const before_gear_match = before_number_regex.exec(before_gear)
    if(before_gear_match) nums.push(parseInt(before_gear_match[1]))

    const after_gear = arr[row].substring(index + 1, index + 4)
    const after_gear_match = after_number_regex.exec(after_gear)
    if(after_gear_match) nums.push(parseInt(after_gear_match[1]))

    if(nums.length > 1) gear_ratios.push(nums[0] * nums[1])
}

function getNumbersFromAdjacentRow(row) {
    const numbers = []
    if(isNaN(parseInt(row[2]))) row = "..." + row.substring(3)
    if(isNaN(parseInt(row[4]))) row = row.substring(0, 4) + "..."

    // remove trailing numbers
    row = row.replace(/(\.+\d$)|(^\d\.+)/g, "..")

    let match
    while ((match = numbers_regex.exec(row)) != null) {
        numbers.push(parseInt(match[0]))
    }

    return numbers
}

const sum = gear_ratios.reduce((a, b) => a+ b)

console.log(`The sum of gear ratios is: ${sum}`)