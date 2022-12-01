let state = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split(",")
    .map(Number)
    //[16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

let max = Math.max(...state)

fuel_consumption = Array.from({length: max}, () => 0)


const calculateFuel = (steps) => {
    if (!steps) return 0
    //calculate gaussian sum 
    // https://en.wikipedia.org/wiki/Gauss_sum
    return 0.5 * steps * (steps + 1)
}

for(let i = 0; i < max; ++i) {
    state.forEach(fuel => {
        if (fuel < i) {
            fuel_consumption[i] += calculateFuel(i-fuel)
        } else if (fuel > i) {
            fuel_consumption[i] += calculateFuel(fuel-i)
        }
    })
}

let best = Math.min(...fuel_consumption)

console.log(best)