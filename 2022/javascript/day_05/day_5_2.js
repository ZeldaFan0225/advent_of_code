const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const [cargo_full, moves_full] = input.split("\n\n")

const moves = moves_full.split("\n").map(d => {
    const nums = d.match(/(\d+)/g)
    return {
        move: parseInt(nums[0]),
        // -1 for the index
        from: parseInt(nums[1])-1,
        to: parseInt(nums[2])-1
    }
})

const cargo_rows = cargo_full.split("\n")
cargo_rows.pop()
const cargo = Array.from({length: 9}, () => ([]))
cargo_rows.forEach((row) => {
    let i = 0
    while(true) {
        const container = row.slice(i * 4, (i+1) * 4)
        if(!container.length) break;
        if(container.trim()) {
            cargo[i].unshift(container.trim().replace(/\[|\]/g, ""))
        }
        ++i;
    }
})


for(let move of moves) {
    const removed = cargo[move.from].splice(-move.move)
    cargo[move.to].push(...removed)
}

console.log(cargo.map(r => r.at(-1)).join(""))