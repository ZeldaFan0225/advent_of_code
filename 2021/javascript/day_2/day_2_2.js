const file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
let input = file.toString("utf-8")
    .split("\n")

let position = {horizontal: 0, depth: 0, aim: 0}

input.forEach(v => {
    let amount = Number(v.split(" ")[1])
    switch(v.split(" ")[0]){
        case "forward": {
            position.horizontal += amount;
            position.depth += (position.aim * amount);
            break
        }
        case "up":{
            position.aim -= amount;
            break
        }
        case "down":{
            position.aim += amount;
            break
        }
    }
})

console.log(position.horizontal * position.depth)