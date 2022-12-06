const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8")
const chars = input.split("")
let found = false
let i = 0
while(!found) {
    const temp_chars = chars.slice(i, i + 4)
    if([...new Set(temp_chars)].length === temp_chars.length) {
        found = true
    }
    ++i;
}

console.log("Found after: ", i+3)