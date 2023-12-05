const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n\n")

const seeds_string = lines.splice(0, 1)[0]
const maps = {}
const seeds = seeds_string.split(" ").slice(1).map(n => parseInt(n))

for(let map of lines) {
    const maplines = map.split("\n")
    const mapname = maplines.splice(0, 1)[0].replace(" map:", "")
    maps[mapname] = []

    maplines.forEach(m => {
        const [destination, source, range] = m.split(" ").map(n => parseInt(n))
        maps[mapname].push({
            source_start: source,
            source_end: source + range - 1,
            destination,
            range,
            diff: destination - source
        })
    })
}

console.log(maps)

for(let processing of Object.values(maps)) {
    for(let i = 0; i < seeds.length; i++) {
        const seed = seeds[i]
        for(let map of processing) {
            if (seed >= map.source_start && seed <= map.source_end) {
                seeds[i] = seed + map.diff
                break;
            }
        }
    }
}


// Too high:1136789458

console.log("The locations are: ", seeds.join(", "))
console.log("The lowest location is: ", seeds.sort()[0])