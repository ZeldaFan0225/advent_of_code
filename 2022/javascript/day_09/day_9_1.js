const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const moves = input.split("\n").map(l => ({direction: l.split(" ")[0], amount: parseInt(l.split(" ")[1])}))

// object with keys like "0|0" or "3|6" or "12|59"
const visited = {

}

function tailNearHead(head, tail) {
    const [head_y, head_x] = head.split("|").map(n => parseInt(n))
    const [tail_y, tail_x] = tail.split("|").map(n => parseInt(n))
    if([tail_x-1, tail_x, tail_x+1].includes(head_x) && [tail_y-1, tail_y, tail_y+1].includes(head_y)) return true;
    else return false
}

let head_pos = "0|0"
let tail_pos = "0|0"


for(let move of moves) {
    let [head_y, head_x] = head_pos.split("|").map(n => parseInt(n))
    let [tail_y, tail_x] = tail_pos.split("|").map(n => parseInt(n))
    for(let i = 0; i < move.amount; ++i) {
        switch(move.direction) {
            case "R": head_x += 1; break;
            case "L": head_x -= 1; break;
            case "U": head_y += 1; break;
            case "D": head_y -= 1; break;
        }
        
        head_pos = `${head_y}|${head_x}`;

        let is_near = tailNearHead(head_pos, tail_pos)
        if(!is_near) {
            switch(move.direction) {
                case "R": {
                    tail_x = head_x-1
                    tail_y = head_y
                    break;
                }
                case "L": {
                    tail_x = head_x+1
                    tail_y = head_y
                    break;
                }
                case "U": {
                    tail_y = head_y-1
                    tail_x= head_x
                    break;
                }
                case "D": {
                    tail_y = head_y+1
                    tail_x = head_x
                    break;
                }
            }
            tail_pos = `${tail_y}|${tail_x}`;
            visited[tail_pos] = (visited[tail_pos] ? visited[tail_pos] + 1 : 1)
        }
    }
}

let res = Object.values(visited).length
console.log(res)