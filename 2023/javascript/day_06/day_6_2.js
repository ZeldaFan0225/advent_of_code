const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")

const time = parseInt(/\d+/g.exec(lines[0].replaceAll(" ", ""))[0])
const distance = parseInt(/\d+/g.exec(lines[1].replaceAll(" ", ""))[0])

const ends = getEnds(time, distance)
const tolerance = ends.upper - ends.lower + 1

function getEnds(time, distance) {
    const fraction = time / 2;
    const t1 = fraction - Math.sqrt(fraction**2 - (distance + 1))
    const t2 = fraction + Math.sqrt(fraction**2 - (distance + 1))

    return {
        lower: Math.ceil(t1),
        upper: Math.floor(t2)
    }
}

console.log(`The amount of possible ways to win are: ${tolerance}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)