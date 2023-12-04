const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")

const cards = lines.map((l, i) => {
    const [winning_line, own_line] = l.split(" | ")
    const winning = winning_line.split(": ")[1].split(" ").map(n => parseInt(n)).filter(n => !isNaN(n))
    const own = own_line.split(" ").map(n => parseInt(n)).filter(n => !isNaN(n))
    return {
        winning,
        own,
        index: i,
        process_amount: 1
    }
})

console.log(cards)

for(let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const score = getAmountMatching(card)
    for(let ind = card.index + 1; ind <= (card.index + score); ind++) {
        cards[ind].process_amount += card.process_amount
    }
}

function getAmountMatching(card_data) {
    let matching = 0;
    card_data.own.forEach(own => {
        if(card_data.winning.includes(own)) matching++
    })
    return matching
}

console.log(cards)

const score = cards.map(c => c.process_amount).reduce((a, b) => a + b)

console.log(`Total number of scratchcards: ${score}`)