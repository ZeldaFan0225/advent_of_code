const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const forest = input.split("\n").map(row => row.split("").map(n => parseInt(n)))

function getColumn(f, index) {
    return f.map(row => row[index])
}

let highest = 0;

forest.forEach((row, row_i) => {
    row.forEach((tree, tree_i) => {
        if(!tree) return;
        const curr_col = getColumn(forest, tree_i)
        const curr_row = row
        const curr_column_before = curr_col.slice(0, row_i).reverse()
        const curr_column_after = curr_col.slice(row_i+1)
        const curr_row_before = curr_row.slice(0, tree_i).reverse()
        const curr_row_after = curr_row.slice(tree_i+1)

        let temp = false

        function filterStuff(v) {
            if(temp) return false;
            if(v >= tree) temp = true;
            return true;
        }

        const view_row_before = curr_row_before.filter(filterStuff).length || 1
        temp = false;
        const view_row_after = curr_row_after.filter(filterStuff).length || 1
        temp = false;
        const view_column_before = curr_column_before.filter(filterStuff).length || 1
        temp = false;
        const view_column_after = curr_column_after.filter(filterStuff).length || 1

        const res = view_row_before * view_row_after * view_column_before * view_column_after
        if(res > highest) highest = res
    })
})

console.log(highest)