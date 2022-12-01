let input = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split("\r\n")
    .map(v => v.split(" | ").map(va => va.split(" ")))



let res = 0
for(let segments of input) {
    let outputs = segments[1]
    outputs.forEach(v => {
        if ([2, 3, 4, 7].includes(v.length)) ++res
    })
}

console.log(res)