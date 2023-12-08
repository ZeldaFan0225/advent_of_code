const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const [instruction, nodes_text] = input.split("\n\n")
const nodes_lines = nodes_text.split("\n")
const nodes_regex = /^\(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/

const instructions = instruction.split("").map(i => i === "L" ? 0 : 1)
const nodes = {}
let curr_nodes = []

nodes_lines.forEach(l => {
    const [name, children] = l.split(" = ")
    const child_arr = []
    let match = nodes_regex.exec(children);

    nodes[name] = match.slice(1, 3)
})

for(let node of Object.keys(nodes)) {
    if(node.endsWith(("A"))) curr_nodes.push(node)
}

const lengths = []

for(let node of curr_nodes) {
    lengths.push(chainLength(node))
}

function chainLength(start) {
    let ind = 0;
    let current_node = start;
    while(!current_node.endsWith("Z")) {
        current_node = nodes[current_node][instructions[ind % instructions.length]]
        ind++
    }

    return ind;
}

function gcd (a, b) {
    if(b === 0) return a;
    return gcd(b, a%b);
}

function lcm (a, b) {
    return Math.abs(a * b) / gcd(a, b)
}

console.log(`Benötigte Schritte: ${lengths.reduce(lcm)}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)