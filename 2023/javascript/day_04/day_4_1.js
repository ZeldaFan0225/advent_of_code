const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")

const cards = lines.map(l => {
    const [winning_line, own_line] = l.split(" | ")
    const winning = winning_line.split(": ")[1].split(" ").map(n => parseInt(n)).filter(n => !isNaN(n))
    const own = own_line.split(" ").map(n => parseInt(n)).filter(n => !isNaN(n))
    return {
        winning,
        own
    }
})

const values = cards.map(c => {
    return getCardValue(c)
})

function getCardValue(card_data) {
    let value = 0;
    card_data.own.forEach(own => {
        if(card_data.winning.includes(own)) value = (value || 0.5) * 2
    })
    return value
}

const sum = values.reduce((a, b) => a + b)

console.log(`The sum of wins is: ${sum}`)