const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")
const number_regex = /\d+/g

const times = []
const distances = []
const tolerances = []

let match;
while((match = number_regex.exec(lines[0])) != null) {
    times.push(parseInt(match[0]))
}
while((match = number_regex.exec(lines[1])) != null) {
    distances.push(parseInt(match[0]))
}

for(let i in times) {
    const ends = getEnds(times[i], distances[i])
    const diff = ends.upper - ends.lower + 1

    tolerances.push(diff)
}

function getEnds(time, distance) {
    const fraction = time / 2;
    const t1 = fraction - Math.sqrt(fraction**2 - (distance + 1))
    const t2 = fraction + Math.sqrt(fraction**2 - (distance + 1))

    return {
        lower: Math.ceil(t1),
        upper: Math.floor(t2)
    }
}

const ways_count = tolerances.reduce((a, b) => a * b)

console.log(`The amount of possible ways to win are: ${ways_count}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)