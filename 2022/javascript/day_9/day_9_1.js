const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const moves = input.split("\n").map(l => ({direction: l.split(" ")[0], amount: parseInt(l.split(" ")[1])}))

// object with keys like "0-0" or "3-6" or "12-59"
const visited = {
    
}

function tailNearHead(head, tail) {
    const [head_y, head_x] = head.split("-").map(n => parseInt(n))
    const [tail_y, tail_x] = tail.split("-").map(n => parseInt(n))
    if([tail_x-1, tail_x, tail_x+1].includes(head_x) && [tail_y-1, tail_y, tail_y+1].includes(head_y)) return true;
    else return false
}

let head_pos = "0-0"
let tail_pos = "0-0"

for(let move of moves) {
    let [head_y, head_x] = head_pos.split("-").map(n => parseInt(n))
    console.log(head_y)
    console.log(head_x)
    let [tail_y, tail_x] = tail_pos.split("-").map(n => parseInt(n))
    switch(move.direction) {
        case "R": {
            head_x += move.amount
            tail_x = head_x-1
            tail_y = head_y
            break;
        }
        case "L": {
            head_x -= move.amount
            tail_x = head_x+1
            tail_y = head_y
            break;
        }
        case "U": {
            head_y += move.amount
            tail_y = head_y-1
            tail_x= head_x
            break;
        }
        case "D": {
            head_y -= move.amount
            tail_y = head_y+1
            tail_x= head_x
            break;
        }
    }
    if(head_y < 0) head_y = 0
    if(head_x < 0) head_x = 0
    if(tail_y < 0) tail_y = 0
    if(tail_x < 0) tail_x = 0
    head_pos = `${head_y}-${head_x}`;
    tail_pos = `${tail_y}-${tail_x}`;
    // calculate distance it moved
}

let res = Object.values(visited).reduce((a,b) => a+b)

console.log(res)