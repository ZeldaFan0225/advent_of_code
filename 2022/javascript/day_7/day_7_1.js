const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const lines = input.split("\n")

let current_dir = ""
let file_system = {dirs: {}, files: []}

for(let line of lines) {
    if(line.startsWith("$")) {
        if(line.startsWith("$ cd")) {
            let path = line.replace("$ cd ", "")
            if(path === "..") {
                current_dir = current_dir.split("/").slice(0, -1).join("/").trim()
                current_dir = (current_dir === "/" ? "" : current_dir)
            } else {
                current_dir += `/${path}`
            }
        }
    } else if(line.startsWith("dir")) {
        let dir = line.replace("dir ", "")
        let temp = file_system
        current_dir.split("/").slice(1).forEach(d => temp = temp.dirs[d])
        temp.dirs[dir] = {dirs: {}, files: []}
    } else {
        let [size, name] = line.split(" ")
        let temp = file_system
        current_dir.split("/").slice(1).forEach(d => temp = temp.dirs[d])
        temp.files.push({name,size: parseInt(size)})
    }
}

function getFilesSize(files) {
    if(!files.length) return 0
    return files.map(f => f.size).reduce((a,b) => a+b)
}

let large_dirs = []

function getFileSizePlusInnerDirectories(layer) {
    const files = getFilesSize(layer.files)
    let dir_file_sizes = 0
    if(Object.keys(layer.dirs).length) {
        dir_file_sizes = Object.values(layer.dirs).map(d => getFileSizePlusInnerDirectories(d)).reduce((a,b) => a+b)
    }
    if(files + dir_file_sizes <= 100000) large_dirs.push(files + dir_file_sizes)
    return files + dir_file_sizes
}

file_system.files = []
getFileSizePlusInnerDirectories(file_system)

console.log(large_dirs.reduce((a,b) => a+b))