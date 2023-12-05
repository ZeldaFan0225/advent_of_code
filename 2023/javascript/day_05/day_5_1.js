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
        const [source, destination, range] = m.split(" ").map(n => parseInt(n))
        maps[mapname].push({
            source,
            destination,
            range,
            diff: destination - source
        })
    })
}

console.log(maps)