const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

const [cargo_full, moves_full] = input.split("\n 1   2   3   4   5   6   7   8   9 \n\n")

const moves = moves_full.split("\n").map(d => {
    const nums = d.match(/(\d+)/g)
    return {
        move: parseInt(nums[0]),
        from: parseInt(nums[1]),
        to: parseInt(nums[2])
    }
})

// make cargo 2 dimensional array

console.log(cargo)