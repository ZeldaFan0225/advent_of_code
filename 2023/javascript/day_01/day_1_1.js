const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const codes = input.split("\n")

const numbers = []

for(let code of codes) {
    let first, last;

    for(let char of code.split("")) {
        const parsed = parseInt(char)
        if(!isNaN(parsed)) {
            if(first === undefined) first = parsed
            last = parsed
        }
    }
    numbers.push(first * 10 + last)
}

const sum = numbers.reduce((a, b) => a + b)

console.log(`The sum of all numbers is: ${sum}`)