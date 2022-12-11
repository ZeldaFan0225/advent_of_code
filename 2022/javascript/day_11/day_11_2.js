const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const monkey_raw = input.split("\n\n")

// thanks https://github.com/ckohen i would have never had the idea of this
let dividor = 1;

const monkeys = monkey_raw.map(r => {
    const [starting_items, operation_raw, test_raw, outcome_true, outcome_false] = r.split("\n").map(l => l.trim()).slice(1)
    const items = starting_items.replace("Starting items: ", "").split(", ").map(n => parseInt(n))
    const operation = (old) => eval(`((old) => ${operation_raw.split(" ").slice(3).join(" ")})(${old})`)
    const divisable = parseInt(test_raw.split(" ")[3])
    const if_true = parseInt(outcome_true.split(" ")[5])
    const if_false = parseInt(outcome_false.split(" ")[5])

    dividor *= divisable;
    return {
        items,
        operation,
        divisable,
        if_true,
        if_false,
        inspected: 0
    }
})

for(let i = 0; i < (10000 * monkeys.length); ++i) {
    let monkey_i = i % monkeys.length
    let monkey = monkeys[monkey_i]
    if(!monkey.items.length) continue;
    monkey.items.forEach(item => {
        const new_item = monkey.operation(item) % dividor
        ++monkey.inspected
        if(new_item % monkey.divisable === 0) monkeys[monkey.if_true].items.push(new_item)
        else monkeys[monkey.if_false].items.push(new_item)
    })
    monkey.items = [];
    console.log(i)
}

const scores = monkeys.sort((a,b) => b.inspected - a.inspected).map(i => i.inspected)

console.log("Monkey Business: ", scores[0] * scores[1])


