const {readFileSync} = require("fs")
const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const directions = input.split("")

let map = Array.from({length: 4}, () => Array.from({length: 7}, () => 0))

let move_i = 0
function getNextDirection() {
    const num = directions[move_i % directions.length] === "<" ? -1 : 1
    ++move_i;
    return num;
}

function addNewRock(shape) {
    map = map.filter(arr => arr.some(n => n))
    map.unshift(...Array.from({length: 3}, () => Array.from({length: 7}, () => 0)))
    switch(shape) {
        case 0: {
            map.unshift([0, 0, 1, 1, 1, 1, 0])
            break;
        }
        case 1: {
            map.unshift([0, 0, 0, 1, 0, 0, 0])
            map.unshift([0, 0, 1, 1, 1, 0, 0])
            map.unshift([0, 0, 0, 1, 0, 0, 0])
            break;
        }
        case 2: {
            map.unshift([0, 0, 1, 1, 1, 0, 0])
            map.unshift([0, 0, 0, 0, 1, 0, 0])
            map.unshift([0, 0, 0, 0, 1, 0, 0])
            break;
        }
        case 3: {
            map.unshift([0, 0, 1, 0, 0, 0, 0])
            map.unshift([0, 0, 1, 0, 0, 0, 0])
            map.unshift([0, 0, 1, 0, 0, 0, 0])
            map.unshift([0, 0, 1, 0, 0, 0, 0])
            break;
        }
        case 4: {
            map.unshift([0, 0, 1, 1, 0, 0, 0])
            map.unshift([0, 0, 1, 1, 0, 0, 0])
            break;
        }
    }
}

function moveRock(shape, curr_pos) {
    const direction = getNextDirection()
    let new_pos = {
        x: curr_pos.x,
        y: curr_pos.y
    }
    switch(shape) {
        case 0: {
            if(direction < 0) {
                if(map[curr_pos.y][curr_pos.x-1] === 0) {
                    map[curr_pos.y][curr_pos.x-1] = 1
                    map[curr_pos.y][curr_pos.x+3] = 0
                }
                new_pos = {
                    x: curr_pos.x-1,
                    y: curr_pos.y
                }
            }
            if(direction > 0) {
                if(map[curr_pos.y][curr_pos.x+4] === 0) {
                    map[curr_pos.y][curr_pos.x+4] = 1
                    map[curr_pos.y][curr_pos.x] = 0
                }
                new_pos = {
                    x: curr_pos.x+1,
                    y: curr_pos.y
                }
            }
            if([
                map[curr_pos.y+1][new_pos.x],
                map[curr_pos.y+1][new_pos.x+1],
                map[curr_pos.y+1][new_pos.x+2],
                map[curr_pos.y+1][new_pos.x+3]
            ].every(n => !n)) {
                map[curr_pos.y+1][new_pos.x] = 1
                map[curr_pos.y+1][new_pos.x+1] = 1
                map[curr_pos.y+1][new_pos.x+2] = 1
                map[curr_pos.y+1][new_pos.x+3] = 1
                map[curr_pos.y][new_pos.x] = 0
                map[curr_pos.y][new_pos.x+1] = 0
                map[curr_pos.y][new_pos.x+2] = 0
                map[curr_pos.y][new_pos.x+3] = 0
                new_pos = {
                    x: curr_pos.x,
                    y: curr_pos.y+1
                }
            }
        }
        case 1: {
            if(direction < 0) {
                if(map[curr_pos.y+1][curr_pos.x-1] === 0 && map[curr_pos.y+2][curr_pos.x] === 0) {
                    map[curr_pos.y][curr_pos.x] = 1
                    map[curr_pos.y+1][curr_pos.x-1] = 1
                    map[curr_pos.y+2][curr_pos.x] = 1
                    map[curr_pos.y][curr_pos.x+1] = 0
                    map[curr_pos.y+1][curr_pos.x+2] = 0
                    map[curr_pos.y+2][curr_pos.x+1] = 0
                }
                new_pos = {
                    x: curr_pos.x-1,
                    y: curr_pos.y
                }
            }
            if(direction > 0) {
                if(map[curr_pos.y+1][curr_pos.x+3] === 0 && map[curr_pos.y+2][curr_pos.x+2] === 0) {
                    map[curr_pos.y][curr_pos.x] = 1
                    map[curr_pos.y+1][curr_pos.x-1] = 1
                    map[curr_pos.y+2][curr_pos.x] = 1
                    map[curr_pos.y][curr_pos.x+1] = 0
                    map[curr_pos.y+1][curr_pos.x+2] = 0
                    map[curr_pos.y+2][curr_pos.x+1] = 0
                }
                new_pos = {
                    x: curr_pos.x-1,
                    y: curr_pos.y
                }
            }
        }
    }
    return new_pos
}

for(let i = 0; i < 2022; ++i) {
    const shape = i % 5
    addNewRock(shape)
    let pos = {
        y: 0,
        x: 2
    }
    while(true) {
        const new_pos = moveRock(shape, pos)
        if(pos.x === new_pos.x && pos.y === new_pos.y) {
            break;
        }
        pos = new_pos
        drawMap(map)
    }
}

function drawMap() {
    console.log("")
    console.log(map.map(r => r.map(n => !n ? "." : "#").join("")).join("\n"))
}