const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const commands = input.split("\n").map(cmd => cmd.startsWith("addx ") ? `noop\n${cmd.trim()}` : cmd.trim()).join("\n").split("\n")

let X = 1
const counts = []

for(let i = 0; i < commands.length; ++i) {
    if((i+1-20)%40 === 0) {
        counts.push(Number(X) * (i+1))
    }
    if(commands[i] !== "noop") {
        const val = parseInt(commands[i].split(" ")[1])
        X += val
    }
}

console.log("Final Result: ", counts.reduce((a,b) => a+b))