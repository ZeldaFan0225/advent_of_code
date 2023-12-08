const {readFileSync} = require("fs")
const BENCHMARK_START = process.hrtime.bigint()

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const [instruction, nodes_text] = input.split("\n\n")
const nodes_lines = nodes_text.split("\n")
const nodes_regex = /^\(([A-Z]{3}), ([A-Z]{3})\)$/

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

let i = 0;
while(curr_nodes.some(node => !node.endsWith("Z"))) {
    for(let ind = 0; ind < curr_nodes.length; ind++) {
        if(!curr_nodes[ind].endsWith("Z")) {
            curr_nodes[ind] = nodes[curr_nodes[ind]][instructions[i % instructions.length]]
        }
    }
    i++
}

console.log(`Benötigte Schritte: ${i}`)

const BENCHMARK_END = process.hrtime.bigint()
console.log(`Execution time: ${(BENCHMARK_END - BENCHMARK_START) / 1000n}µs`)