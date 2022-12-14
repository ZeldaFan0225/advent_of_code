const {readFileSync} = require("fs")
const { off } = require( "process" )

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
let paths = input.split("\n").map(p => (p.split(" -> ").map(p => ({x: parseInt(p.split(",")[0]), y: parseInt(p.split(",")[1])}))))

// 0 => Air
// 1 => Sand
// 2 => Stone

const highest_x = paths.flat().map(p => p.x).sort((a,b) => b-a)[0]
const highest_y = paths.flat().map(p => p.y).sort((a,b) => b-a)[0]
const lowest_x = paths.flat().map(p => p.x).sort((a,b) => a-b)[0]

const spawn_x = 500 - lowest_x + 5
let sand_count = 0

paths = paths.map(path => path.map(coor => ({x: coor.x-lowest_x+5, y: coor.y})))
let map = Array.from({length: highest_y+1}, () => Array.from({length: highest_x-lowest_x+10}, () => 0))

paths.forEach((path) => {
    path.forEach((c, i, a) => {
        const curr = c
        const next = a[i+1]
        if(!next) return;
        if(next.x === curr.x) {
            const [from, to] = [curr.y, next.y].sort((a,b) => a-b)
            for(let j = 0; j < Math.abs(to-from); ++j) {
                if(!map[from+j]?.length) map[from+j] = []
                map[from+j][curr.x] = 2
            } 
        } else {
            const [from, to] = [curr.x, next.x].sort((a,b) => a-b)
            if(!map[curr.y]?.length) map[curr.y] = []
            map[curr.y].splice(from, Math.abs(to-from)+1, ...Array.from({length: Math.abs(to-from)+1}, () => 2))
        }
    })
})

function drawMap() {
    console.clear()
    console.log(map.map(r => r.map(n => !n ? "." : n === 1 ? "x" : "#").join("")).join("\n"))
}


function calcMoveTo(pos) {
    if(pos.y === map.length-1) return false;
    if(!map[pos.y+1][pos.x]) return {y: pos.y+1, x: pos.x}
    if(!map[pos.y+1][pos.x-1]) return {y: pos.y+1, x: pos.x-1}
    if(!map[pos.y+1][pos.x+1]) return {y: pos.y+1, x: pos.x+1}
    return pos
}

main_loop:
while(true) {
    let curr_pos = {x: Number(spawn_x), y: 0}
    while(true) {
        const next_pos = calcMoveTo(curr_pos)
        if(!next_pos) {
            break main_loop;
        }
        if(next_pos.x === curr_pos.x && next_pos.y === curr_pos.y) break;
        map[curr_pos.y][curr_pos.x] = 0
        map[next_pos.y][next_pos.x] = 1
        curr_pos = next_pos
    }
    sand_count++
}

drawMap()
console.log("Pieces of Sand Fallen: ", sand_count)