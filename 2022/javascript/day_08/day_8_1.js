const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const forest = input.split("\n").map(row => row.split("").map(n => parseInt(n)))

function getRow(f, index) {
    return f[index]
}

function getColumn(f, index) {
    return f.map(row => row[index])
}

let visible = 0

forest.forEach((row, row_i) => {
    row.forEach((tree, tree_i) => {
        if((row_i === 0 || row_i === forest.length-1) || (tree_i === 0 || tree_i === row.length-1)) return visible += 1;
        const curr_col = getColumn(forest, tree_i)
        const curr_row = row
        const curr_column_before = curr_col.slice(0, row_i)
        const curr_column_after = curr_col.slice(row_i+1)
        const curr_row_before = curr_row.slice(0, tree_i)
        const curr_row_after = curr_row.slice(tree_i+1)

        if(
            !curr_column_before.filter(n => n >= tree).length ||
            !curr_column_after.filter(n => n >= tree).length ||
            !curr_row_before.filter(n => n >= tree).length ||
            !curr_row_after.filter(n => n >= tree).length
        ) visible += 1
    })
})

console.log(visible)