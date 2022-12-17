const {readFileSync} = require("fs")
const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

const valves = input.split("\n").map(l => {
    const valves = l.match(/([A-Z]{2})/g)
    const flow_rate = parseInt(l.match(/(\d+)/g)[0])

    return {
        name: valves.splice(0, 1)[0],
        connected_to: valves,
        flow_rate,
        opened: 0,
        time: 0
    }
})

function BFS() {
    let queue = []
    const result = []
    queue.push(valves[0])
    queue[0].path = `${queue[0].name},${queue[0].flow_rate}`
    while(queue.length) {
        const current_node = queue.shift()
        const approx = valves.filter(v => current_node.connected_to.includes(v.name))
        for(let nearby of approx) {
            nearby.opened = nearby.flow_rate + current_node.opened
            nearby.time += (nearby.flow_rate ? 2 : 1)
            if(nearby.time < 30) queue.push(nearby);
        }
        current_node.explored = true;
        queue = [...new Set(queue)]
        result.push(current_node)
    }
    return result
}

console.log(BFS().sort((a,b) => b.opened - a.opened)[0])