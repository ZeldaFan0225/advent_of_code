const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const commands = input.split("\n").map(cmd => cmd.startsWith("addx ") ? `noop\n${cmd.trim()}` : cmd.trim()).join("\n").split("\n")

let X = 1
const display = Array.from({length: 6}, () => [])
let add_queue = []

for(let i = 0; i < commands.length; ++i) {
    let row = Math.floor((i)/40)
    let pos = i - (row*40)
    if([X-1, X, X+1].includes(pos)) {
        display[row][pos] = "█"
    } else display[row][pos] = " "
    if(commands[i] !== "noop") {
        const val = parseInt(commands[i].split(" ")[1])
        X += val
    }
}

console.log(display.map(r => r.join("")).join("\n"))