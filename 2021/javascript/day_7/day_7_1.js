let state = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split(",")
    .map(Number)
    //[16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

let max = Math.max(...state)

fuel_consumption = Array.from({length: max}, () => 0)
for(let i = 0; i < max; ++i) {
    state.forEach(fuel => {
        if(fuel < i) {
            fuel_consumption[i] += (i-fuel)
        } else if(fuel > i) {
            fuel_consumption[i] += (fuel-i)
        }
    })
}

let best = Math.min(...fuel_consumption)

console.log(best)