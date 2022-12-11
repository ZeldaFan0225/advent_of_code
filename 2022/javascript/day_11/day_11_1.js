const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const monkey_raw = input.split("\n\n")
const monkeys = monkey_raw.map(r => {
    const [starting_items, operation_raw, test_raw, outcome_true, outcome_false] = r.split("\n").map(l => l.trim()).slice(1)
    const items = starting_items.replace("Starting items: ", "").split(", ").map(n => parseInt(n))
    const operation = (old) => eval(`((old) => ${operation_raw.split(" ").slice(3).join(" ")})(${old})`)
    const divisable = parseInt(test_raw.split(" ")[3])
    const if_true = parseInt(outcome_true.split(" ")[5])
    const if_false = parseInt(outcome_false.split(" ")[5])

    return {
        items,
        operation,
        divisable,
        if_true,
        if_false,
        inspected: 0
    }
})

for(let i = 0; i < (20 * monkeys.length); ++i) {
    let monkey_i = i % monkeys.length
    if(!monkeys[monkey_i].items.length) continue;
    monkeys[monkey_i].items.forEach(item => {
        const new_item = Math.floor(monkeys[monkey_i].operation(item)/3)
        ++monkeys[monkey_i].inspected
        if(new_item % monkeys[monkey_i].divisable === 0) monkeys[monkeys[monkey_i].if_true].items.push(new_item)
        else monkeys[monkeys[monkey_i].if_false].items.push(new_item)
    })
    monkeys[monkey_i].items = [];
}

const scores = monkeys.sort((a,b) => b.inspected - a.inspected).map(i => i.inspected)

console.log("Monkey Business: ", scores[0] * scores[1])


