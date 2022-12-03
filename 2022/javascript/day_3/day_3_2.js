const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "").split("\n")
const teams = Array.from({length: input.length/3}, () => input.splice(0, 3))

const badge_priorities = teams.map(t => {
    const [member_1_arr, member_2_arr, member_3_arr] = t.map(r => r.split(""))
    const same = member_1_arr.find(l => member_2_arr.includes(l) && member_3_arr.includes(l))
    const priority = getPriority(same)
    return priority
})

function getPriority(letter) {
    return letter.charCodeAt(0) - (isUpperCase(letter) ? 38 : 96)
}

function isUpperCase(letter) {
    return letter.toUpperCase() === letter
}

const result = badge_priorities.reduce((a, b) => a + b)
console.log(result)