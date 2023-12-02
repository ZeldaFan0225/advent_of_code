const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const games_raw = input.split("\n")

const count = {
    red: 12,
    green: 13,
    blue: 14
}

const games = games_raw.map((game, i) => {
    const rounds = game.replace(/Game \d+ : /, "").split("; ").map(round => {
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

    return {
        id: i+1,
        rounds
    }
})

const possible_games = games.filter(g => {
    return g.rounds.every(round =>
        (
            round.blue <= count.blue &&
            round.red <= count.red &&
            round.green <= count.green
        )
    )
})

const possible_games_ids = possible_games.map(g => g.id)

const sum = possible_games_ids.reduce((a, b) => a + b)

console.log(`The sum of all possible game IDs is: ${sum}`)