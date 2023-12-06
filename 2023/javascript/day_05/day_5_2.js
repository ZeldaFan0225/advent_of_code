const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n\n")

const seeds_string = lines.splice(0, 1)[0]
const categories = []
const seed_pairs = seeds_string.split(" ").slice(1).map(n => parseInt(n))
const seeds = []
for(let i = 0; i < seed_pairs.length; i += 2) {
    seeds.push({
        range_start: seed_pairs[i],
        range_end: seed_pairs[i] + (seed_pairs[i + 1] - 1),
    })
}

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

console.log(categories)

for(let category of categories) {
    let i = 0
    const length = seeds.length
    const to_push= []
    while(seeds[i]) {
        console.log(seeds[i])
        for(let map of category) {
            // if overlapping exists
            if(seeds[i].range_end >= map.source_start || seeds[i].range_start <= map.source_end) {
                // if fully inside map range
                if(seeds[i].range_start >= map.source_start && seeds[i].range_end <= map.source_end) {
                    seeds[i] = {
                        range_start: seeds[i].range_start + map.diff,
                        range_end: seeds[i].range_end + map.diff,
                    }
                    break;
                // if only the end is overlapping
                } else if(seeds[i].range_end >= map.source_start && seeds[i].range_start < map.source_start) {
                    to_push.push({
                        range_start: map.source_start + map.diff,
                        range_end: seeds[i].range_end + map.diff,
                    })
                    seeds[i] = {
                        range_start: seeds[i].range_start,
                        range_end: map.source_start - 1,
                    }
                    break;
                // if only the start is overlapping
                } else if(seeds[i].range_start <= map.source_end && seeds[i].range_end > map.source_end) {
                    to_push.push({
                        range_start: seeds[i].range_start + map.diff,
                        range_end: map.source_end + map.diff,
                    })
                    seeds[i] = {
                        range_start: map.source_end + 1,
                        range_end: seeds[i].range_end,
                    }
                    break;
                }
            }
        }
        i += 1;
    }
    seeds.push(...to_push)
}

seeds.sort((a, b) => a.range_start - b.range_start)

console.log("The resulting maps are: ", seeds)
console.log("The lowest location is: ", seeds[0].range_start)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000000n}ms`)