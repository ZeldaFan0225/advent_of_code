const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

let matrix = input.split("\n").map(r => (r.split("").map(n => parseInt(n))))
let total_flashes = 0

function processOneUp(matrix) {
    return matrix.map(r => r.map(n => n+1))
}

function hasFlashing(matrix) {
    return matrix.some(r => r.some(n => n > 9))
}

function processProximate(matrix) {
    const temp = matrix.slice()
    if(hasFlashing(temp)) {
        const rows = temp.filter(r => r.some(n => n > 9))
        for(let row of rows) {
            const row_i = temp.indexOf(row)
            row.forEach((num, num_i) => {
                if(num > 9) {
                    ++total_flashes
                    if(temp[row_i-1]?.[num_i-1]) temp[row_i-1][num_i-1] += 1
                    if(temp[row_i-1]?.[num_i]) temp[row_i-1][num_i] += 1
                    if(temp[row_i-1]?.[num_i+1]) temp[row_i-1][num_i+1] += 1
                    if(temp[row_i]?.[num_i-1]) temp[row_i][num_i-1] += 1
                    temp[row_i][num_i] = 0
                    if(temp[row_i]?.[num_i+1]) temp[row_i][num_i+1] += 1
                    if(temp[row_i+1]?.[num_i-1]) temp[row_i+1][num_i-1] += 1
                    if(temp[row_i+1]?.[num_i]) temp[row_i+1][num_i] += 1
                    if(temp[row_i+1]?.[num_i+1]) temp[row_i+1][num_i+1] += 1
                }
            })
        }
        if(hasFlashing(temp)) return processProximate(temp)
        else return temp
    } else return temp
}

for(let i = 0; i < 100; ++i) {
    matrix = processProximate(processOneUp(matrix))
}

console.log(total_flashes)