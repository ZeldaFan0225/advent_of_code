let file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
    .split("\r\n\r\n")


let numbers = file.shift().split(",").map(n => Number(n))
let boards = file.map(b => {
    return b
    .split("\r\n")
    .map(r => {
        return r //oopsies
        .trim()
        .split(" ")
        .filter(a => a)
        .map(v => Number(v))
    })
})

let ticked = Array.from({length: boards.length}, () => 
    Array.from({length: 5}, () => 
        Array.from({length: 5}, () => false)
    )
)


let won = 0
let i = 0
let unmarked = 0

while(!won) {
    if(won) return null
    boards.forEach((b, index) => {
        b.find((r, ind) => {
            if(r.find(v => v === numbers[i])) ticked[index][ind][r.indexOf(numbers[i])] = true
        })

        if(ticked[index].find(r => r.every(z => z)) || b.every((num) => b.every(() => ticked[index][num]))){
            won = numbers[i];
            unmarked = b
            .map((row, row_index) => 
                row
                    .map((number, number_index) => 
                        ticked[index][row_index][number_index] ? 0 : number
                )
            )
            .flat()
            .reduce((prev, curr) => (prev ?? 0) + curr)
        }
    })
    if(won) break
    ++i
}


console.log(numbers[i])
console.log(unmarked * numbers[i])