const file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
let input = file.toString("utf-8")
    .split("\n")
    .map(v => Number(v))

let result = 0
input.forEach((v, i) => {
    if(input[i-1] && ((v + input[i+1] + input[i+2]) > (input[i-1] + v + input[i+1]))) ++result
})
console.log(result)