let file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split("\n")
    .map(v => v.split(" -> ").map(va => va.split(",").map(n => Number(n))))


let width = Math.max(...file.map(c => [c[0][0], c[1][0]]).flat())
let height =  Math.max(...file.map(c => [c[0][1], c[1][1]]).flat())
let vents = Array.from({length: height+1}, () => Array.from({length: width+1}, () => 0))


file.forEach(vent => {
    if(vent[0][0] === vent[1][0]) {
        let {largest, lowest} = vent[0][1] > vent[1][1] ? {largest: vent[0][1], lowest: vent[1][1]} : {largest: vent[1][1], lowest: vent[0][1]}
        for(let index = lowest; index <= largest; ++index) {
            vents[index][vent[0][0]] = (vents[index]?.[vent[0][0]] ?? 0) + 1
        }
    } else if (vent[0][1] === vent[1][1]) {
        let {largest, lowest} = vent[0][0] > vent[1][0] ? {largest: vent[0][0], lowest: vent[1][0]} : {largest: vent[1][0], lowest: vent[0][0]}
        for(let index = lowest; index <= largest; ++index) {
            vents[vent[0][1]][index] = (vents[vent[0][1]]?.[index] ?? 0) + 1
        }
    } else {
        let ind = vent[0][0]
        if (vent[0][1] > vent[1][1]) {
            for(let index = vent[0][1]; index >= vent[1][1]; --index) {
                vents[index][ind] = (vents[index]?.[ind] ?? 0) + 1
                if(ind > vent[1][0]) --ind
                else ++ind
            }
        } else {
            for(let index = vent[0][1]; index <= vent[1][1]; ++index) {
                vents[index][ind] = (vents[index]?.[ind] ?? 0) + 1
                if(ind > vent[1][0]) --ind
                else ++ind
            }
        }
    }
})

let total = vents.reduce((p, c) => {
    let prev = Array.isArray(p) ? (p.filter(val => val > 1)).length : p
    let curr = c.filter(val => val > 1).length
    return prev + curr
})


console.log(total)