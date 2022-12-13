const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

const start = {
    x: 0,
    y: 0
}
const destination = {
    x: 0,
    y: 0
}

function getHeight(letter) {
    return letter.charCodeAt(0) - 96
}

const grid = input.split("\n").map((r, i) => r.split("").map((n, ii) => {
    if(n === "E") {
        destination.y = i
        destination.x = ii
        return {
            explored: false,
            z: 27,
            y: i,
            x: ii
        }
    }
    if(n === "S") {
        start.y = i
        start.x = ii
        return {
            explored: false,
            z: 0,
            y: i,
            x: ii
        }
    }
    return {
        explored: false,
        z: getHeight(n),
        y: i,
        x: ii
    }
}))

function getApproximate(pos) {
    const current = grid[pos.y][pos.x]
    const res = [
        grid[pos.y-1]?.[pos.x],
        grid[pos.y+1]?.[pos.x],
        grid[pos.y]?.[pos.x-1],
        grid[pos.y]?.[pos.x+1]
    ].filter(v => {
        if(!v) return false;
        if(current.z+1 === v.z || current.z >= v.z) return true;
    })
    return res
}

function BFS() {
    let queue = []
    const result = []
    let finish_node = {}
    queue.push(grid[start.y][start.x])
    queue[0].path = `${start.y},${start.x}`
    while(queue.length) {
        const current_node = queue.shift()
        showCurrent(queue, result, current_node)
        const approx = getApproximate(current_node)
        for(let nearby of approx) {
            if(nearby.z === 27) {
                finish_node = nearby;
                finish_node.path = current_node.path
                break;
            }
            nearby.path = current_node.path + `|${nearby.y},${nearby.x}`
            if(!nearby.explored) queue.push(nearby);
        }
        current_node.explored = true;
        queue = [...new Set(queue)]
        result.push(current_node)
    }
    return finish_node
}

function showCurrent(queue, result, current) {
    const visual = grid.slice().map((r, i) => r.map((_, ii) => {
        if(queue.find(c => c.y == i && c.x == ii)) return "0"
        if(result.find(c => c.y == i && c.x == ii)) return "X"
        return "."
    }))
    visual[current.y][current.x] = "#"
    console.log("Path:")
    console.log(visual.map(r => r.join("")).join("\n"))
}

const path_coordinates = BFS().path.split("|").map(c => ({y: c.split(",")[0],x: c.split(",")[1]}))
const visual = grid.slice().map((r, i) => r.map((_, ii) => {
    if(path_coordinates.find(c => c.y == i && c.x == ii)) return "#"
    return "."
}))

console.log("Path:")
console.log(visual.map(r => r.join("")).join("\n"))
console.log("Path Length: ", path_coordinates.length)