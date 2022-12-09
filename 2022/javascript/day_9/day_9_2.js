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
let rope_positions = Array.from({length: 10}, () => "0|0")


for(let move of moves) {
    let [head_y, head_x] = head_pos.split("|").map(n => parseInt(n))
    for(let i = 0; i < move.amount; ++i) {
        switch(move.direction) {
            case "R": head_x += 1; break;
            case "L": head_x -= 1; break;
            case "U": head_y += 1; break;
            case "D": head_y -= 1; break;
        }
        
        head_pos = `${head_y}|${head_x}`;
        let prev_direction = move.direction

        rope_positions.forEach((pos, i, arr) => {
            let prev = !i ? head_pos : arr[i-1]
            let [prev_y, prev_x] = prev.split("|").map(n => parseInt(n))
            let [pos_y, pos_x] = pos.split("|").map(n => parseInt(n))
            let is_near = tailNearHead(prev, pos)
            if(!is_near) {
                switch(prev_direction) {
                    case "R": {
                        pos_x = prev_x-1
                        if(pos_y-prev_y > 0) prev_direction = "D"
                        if(pos_y-prev_y < 0) prev_direction = "U"
                        pos_y = prev_y
                        break;
                    }
                    case "L": {
                        pos_x = prev_x+1
                        if(pos_y-prev_y > 0) prev_direction = "D"
                        if(pos_y-prev_y < 0) prev_direction = "U"
                        pos_y = prev_y
                        break;
                    }
                    case "U": {
                        pos_y = prev_y-1
                        if(pos_x-prev_x > 0) prev_direction = "L"
                        if(pos_x-prev_x < 0) prev_direction = "R"
                        pos_x= prev_x
                        break;
                    }
                    case "D": {
                        pos_y = prev_y+1
                        if(pos_x-prev_x > 0) prev_direction = "R"
                        if(pos_x-prev_x < 0) prev_direction = "L"
                        pos_x = prev_x
                        break;
                    }
                }
            }
            let new_pos = `${pos_y}|${pos_x}`;
            if(i === rope_positions.length-1) visited[new_pos] = 1;
            rope_positions[i] = new_pos;
        })
        console.log(rope_positions)
    }
}

let res = Object.values(visited).length
// CODE IS NOT WORKING
console.log(res)