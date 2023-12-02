const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const games_raw = input.split("\n")

const games = games_raw.map((game) => {
    return game.replace(/Game \d+ : /, "").split("; ").map(round => {
        const color_count = {
            red: 0,
            green: 0,
            blue: 0
        }

        round.split(", ").forEach(color => {
            const stat = /(\d+) (red|green|blue)/.exec(color)
            color_count[stat[2]] = parseInt(stat[1])
        })

        return color_count
    })
})

const powers = games.map(g => {
    const required = {
        red: 0,
        green: 0,
        blue: 0
    }

    g.forEach(round => {
        if(round.red > required.red) required.red = round.red;
        if(round.green > required.green) required.green = round.green;
        if(round.blue > required.blue) required.blue = round.blue;
    })

    // Calculate power of bag
    return (required.red * required.green * required.blue)
})

const sum = powers.reduce((a, b) => a + b)

console.log(`The sum of the powers is: ${sum}`)