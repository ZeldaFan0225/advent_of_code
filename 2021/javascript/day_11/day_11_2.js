const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

let matrix = input.split("\n").map(r => (r.split("").map(n => parseInt(n))))
let step = 0
let num_of_first_step = 0

function processOneUp(matrix) {
    return matrix.map(r => r.map(n => n+1))
}

function hasFlashing(matrix) {
    return matrix.some(r => r.some(n => n > 9))
}

function processProximate(matrix) {
    ++step
    const temp = matrix.slice()
    if(hasFlashing(temp)) {
        const rows = temp.filter(r => r.some(n => n > 9))
        for(let row of rows) {
            const row_i = temp.indexOf(row)
            row.forEach((num, num_i) => {
                if(num > 9) {
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

while(true) {
    matrix = processProximate(processOneUp(matrix))
    if(matrix.every(r => r.every(n => !n))) break;
}

// not working
console.log(step)