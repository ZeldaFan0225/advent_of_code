let lines = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    /*let lines = `2199943210\r
3987894921\r
9856789892\r
8767896789\r
9899965678`*/
    .split("\r\n")

let deepest = []

lines.forEach((line, i, arr) => {
    let height = line.split("")
    height.forEach((l, ind, array) => {
        if(Number(l) < (Number(array[ind-1] ?? 9))
        && Number(l) < (Number(array[ind+1] ?? 9))
        && Number(l) < (Number(arr[i-1]?.split("")[ind] ?? 9))
        && Number(l) < (Number(arr[i+1]?.split("")[ind] ?? 9))) {
            deepest.push(Number(l))
        }
    })
})

console.log(1 + deepest.reduce((p, c) => p + c + 1))