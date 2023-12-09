const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const functions = input.split("\n")

const function_values = functions.map(f => f.split(" ").map(n => parseInt(n)))

const last_numbers = []

for(let funct of function_values) {
    let derived_values = [funct]
    while(derived_values.at(-1).some(n => n !== 0)) {
        derived_values.push(getDerivedValues(derived_values.at(-1)))
    }

    derived_values.at(-1).unshift(0)

    for(let i = derived_values.length - 1; i > 0; i--) {
        const diff = derived_values[i][0]
        derived_values[i - 1].unshift(derived_values[i - 1][0] - diff)
    }

    last_numbers.push(derived_values[0][0])
}

function getDerivedValues(values) {
    const result = []
    for(let i = 1; i < values.length; i++) {
        result.push(values[i] - values[i - 1])
    }
    return result;
}

const sum = last_numbers.reduce((a, b) => a + b)

console.log(`The sum of newly determined numbers is: ${sum}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)