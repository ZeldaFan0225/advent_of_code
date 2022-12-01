let fish_counts = Array.from({length: 9}, () => 0)
require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split(",")
    .forEach(v => fish_counts[Number(v)]+= 1)

for(let i = 0; i < 80; ++i) {
    let cycle_ended = fish_counts.shift()
    fish_counts.push(cycle_ended)
    fish_counts[6] += cycle_ended
}

let total = fish_counts.reduce((p, c) => (p ?? 0) + c)

console.log(total)