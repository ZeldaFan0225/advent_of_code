const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

// A => Rock
// B => Paper
// C => Scissors

// X => Rock => 1
// Y => Paper => 2
// Z => Scissors => 3

const games = input.split("\n")

const results = games.map(g => {
    const [opponent, own] = g.split(" ")
    let score = own === "X" ? 1 : own === "Y" ? 2 : 3
    switch(opponent + own) {
        case "CX":
        case "BZ":
        case "AY": score += 6; break;
        case "AX":
        case "BY":
        case "CZ": score += 3; break;
    }
    return score
})

const total = results.reduce((a, b) => a + b)

console.log(total)