const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const codes = input.split("\n")

const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const numbers = []

for(let code of codes) {
    let first, last;

    for(let i = 0; i < code.length; i++) {
        let parsed = parseInt(code[i]);
        if(isNaN(parsed)) {
            const num = nums.find(n => code.substring(i).startsWith(n))
            parsed = nums.indexOf(num) + 1
        }

        if(parsed) {
            if(first === undefined) first = parsed
            last = parsed
        }
    }
    numbers.push(first * 10 + last)
}

const sum = numbers.reduce((a, b) => a + b)

console.log(`The sum of all numbers is: ${sum}`)