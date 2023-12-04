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

const values = []
let i = 0;
for(let c of cards) {
    const value = getAmountMatching(c)
    //console.log(i)
    //console.log(i + value + 1)
    //console.log(cards.length)
    if(value) cards.push(...cards.slice(i + 1, i + value + 1 > cards.length ? (i + value + 1) - (i + value + 1 - cards.length)  : i + value + 1))
    i++;
}

function getAmountMatching(card_data) {
    let matching = 0;
    card_data.own.forEach(own => {
        if(card_data.winning.includes(own)) matching++
    })
    return matching
}

console.log(`Total number of scratchcards: ${i}`)