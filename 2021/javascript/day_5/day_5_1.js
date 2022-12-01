let file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    //let file = "0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2"
    .split("\n")
    .map(v => v.split(" -> ").map(va => va.split(",").map(n => Number(n))))
    .filter(v => v[0][0] === v[1][0] || v[0][1] === v[1][1])


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
    }
})

let total = vents.reduce((p, c) => {
    let prev = Array.isArray(p) ? (p.filter(val => val > 1)).length : p
    let curr = c.filter(val => val > 1).length
    return prev + curr
})


console.log(total)