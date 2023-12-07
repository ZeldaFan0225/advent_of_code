const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")

const card_types = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

const decks = lines.map(l => {
    const [deck, bid] = l.split(" ")
    return {
        bid: parseInt(bid),
        deck,
    }
})

function quickSort(arr) {
    if(arr.length === 0) return arr
    const pivot_i = Math.floor(arr.length / 2)
    const pivot = arr[pivot_i]
    const before = []
    const after = []
    for(let i = 0; i < arr.length; i++) {
        if(i === pivot_i) continue;
        if(compareDecks(arr[i].deck, pivot.deck) < 0)  before.push(arr[i])
        else after.push(arr[i])
    }

    return [...quickSort(before), pivot, ...quickSort(after)]
}

function compareDecks(deck_1, deck_2) {
    const type_1 = deckStat(deck_1)
    const type_2 = deckStat(deck_2)
    if(type_1 < type_2) return -1
    else if(type_1 > type_2) return 1

    let result = 0
    //decks are of same type
    for(let i = 0; i < deck_1.length; i++) {
        if(card_types.indexOf(deck_1[i]) < card_types.indexOf(deck_2[i])) {
            result = -1
            break;
        }
        if(card_types.indexOf(deck_1[i]) > card_types.indexOf(deck_2[i])) {
            result = 1
            break;
        }
    }

    return result
}

function deckStat(deck) {
    const cards = deck.split("")
    let type = 1
    const cards_count = {
        "A": 0, "K": 0, "Q": 0, "J": 0, "T": 0, "9": 0, "8": 0, "7": 0, "6": 0, "5": 0, "4": 0, "3": 0, "2": 0
    }

    for(let card of cards) {
        cards_count[card] += 1
    }

    const counts = Object.values(cards_count)

    if(counts.includes(5)) type = 7
    else if(counts.includes(4)) type = 6
    else if(counts.includes(3) && counts.includes(2)) type = 5
    else if(counts.includes(3)) type = 4
    else if(counts.indexOf(2) !== -1 && counts.indexOf(2) !== counts.lastIndexOf(2)) type = 3
    else if(counts.includes(2)) type = 2

    return type
}

let winnings = 0
const sorted = quickSort(decks)

for(let i = 0; i < sorted.length; i++) {
    winnings += ((i+1) * sorted[i].bid)
}

console.log(`The total winnings are: ${winnings}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)