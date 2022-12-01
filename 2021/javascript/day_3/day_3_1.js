const file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")

let count = Array(12).fill(0)
let bits = file.toString("utf-8")
    .split("\n")

bits
.forEach(v => {
        let bits = v.split("")
        bits
        .forEach((v, i) => {
            if(!!Number(v)) ++count[i]
        })
})

let gamma = 0b0
let epsylon = 0b0
count
.reverse()
.forEach((v, i) => {
    if(v > (bits.length-v)) gamma |= 1 << i
    else epsylon |= 1 << i
})

console.log(gamma * epsylon)
//result