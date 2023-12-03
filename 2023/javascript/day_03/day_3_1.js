const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")
const regex_with_chars = /(?<!\.|\d|^)(\d+)(?=\.)|(?<=\.)(\d+)(?!\.|\d|$)|(?<!\.|\d|^)(\d+)(?!\.|\d|$)/g
const regex_numbers = /(\d+)/g

const non_engine_parts = []

lines.forEach((l, row, arr) => {
    let match;
    while ((match = regex_numbers.exec(l)) != null) {
        if(isEnginePart(row, arr, match.index, match[0].length)) non_engine_parts.push(parseInt(match[0]))
    }
})

function isEnginePart(row, arr, index, length) {
    const before_char = arr[row][index - 1]
    if(before_char?.replace(/[0-9.]+/, "")) return true;
    const after_char = arr[row][index + length]
    if(after_char?.replace(/[0-9.]+/, "")) return true;
    const before_row = arr[row - 1]?.substring(index - 1, index + length + 1)
    if(before_row?.replace(/[0-9.]+/, "")) return true;
    const after_row = arr[row + 1]?.substring(index - 1, index + length + 1)
    if(after_row?.replace(/[0-9.]+/, "")) return true;
    return false;
}

const sum = non_engine_parts.reduce((a, b) => a + b)

console.log(`The sum of engine parts is: ${sum}`)