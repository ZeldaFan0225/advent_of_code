const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const rucksacks = input.split("\n")

const doubled_item_priorities = rucksacks.map(r => {
    const [comp1, comp2] = [r.slice(0, r.length/2), r.slice(r.length/2)]
    const [comp1_arr, comp2_arr] = [comp1.split(""), comp2.split("")]
    const same = comp1_arr.find(l => comp2_arr.includes(l))
    
    const priority = same.charCodeAt(0) - (isUpperCase(same) ? 38 : 96)
    return priority
})

function isUpperCase(letter) {
    return letter.toUpperCase() === letter
}

const result = doubled_item_priorities.reduce((a, b) => a+b)
console.log(result)