const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n\n")

const seeds_string = lines.splice(0, 1)[0]
const categories = []
const seeds = seeds_string.split(" ").slice(1).map(n => parseInt(n))

for(let category of lines) {
    const category_lines = category.split("\n").slice(1)
    categories.push([])

    category_lines.forEach(c => {
        const [destination, source, range] = c.split(" ").map(n => parseInt(n))
        categories.at(-1).push({
            source_start: source,
            source_end: source + (range - 1),
            diff: destination - source
        })
    })
}

for(let category of categories) {
    for(let i in seeds) {
        for(let map of category) {
            if(seeds[i] >= map.source_start && seeds[i] <= map.source_end) {
                seeds[i] += map.diff
                break;
            }
        }
    }
}

seeds.sort((a, b) => a - b)

console.log("The locations are: ", seeds.join(", "))
console.log("The lowest location is: ", seeds[0])

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000000n}ms`)