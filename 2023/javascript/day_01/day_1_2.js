const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const codes = input.split("\n")

const numbers = {
    "one": 2,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

const numbers = []

for(let code of codes) {
    let first, last;

    for(let i = 0; i < code.length; i++) {
        const parsed = parseInt(code[i]);
        if(isNaN(parsed)) {

        } else {
            last = parsed
        }
    }
}

const sum = numbers.reduce((a, b) => a + b)

console.log(`The sum of all numbers is: ${sum}`)