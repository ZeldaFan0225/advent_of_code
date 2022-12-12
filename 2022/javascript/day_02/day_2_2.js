const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

// A => Rock
// B => Paper
// C => Scissors

// Rock => 1
// Paper => 2
// Scissors => 3

// X => Lose
// Y => Draw
// Z => Win

const games = input.split("\n")

const results = games.map(g => {
    const [opponent, outcome] = g.split(" ")
    let score = 0
    switch(outcome) {
        case "X": {
            score += opponent === "A" ? 3 : opponent === "B" ? 1 : 2;
            break;
        }
        case "Y": {
            score += 3
            score += opponent === "A" ? 1 : opponent === "B" ? 2 : 3;
            break;
        }
        case "Z": {
            score += 6
            score += opponent === "A" ? 2 : opponent === "B" ? 3 : 1;
            break;
        }
    }
    return score
})

const total = results.reduce((a, b) => a + b)

console.log(total)