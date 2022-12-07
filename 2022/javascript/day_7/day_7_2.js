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

function getFileSizePlusInnerDirectories(layer) {
    const files = getFilesSize(layer.files)
    let dir_file_sizes = 0
    if(Object.keys(layer.dirs).length) {
        dir_file_sizes = Object.values(layer.dirs).map(d => getFileSizePlusInnerDirectories(d)).reduce((a,b) => a+b)
    }
    return files + dir_file_sizes
}

let dir_and_size = []

function mapDirSizes(layer, dir) {
    const files = getFilesSize(layer.files)
    let dir_file_sizes = 0
    if(Object.keys(layer.dirs).length) {
        dir_file_sizes = Object.entries(layer.dirs).map(([k, v]) => mapDirSizes(v, dir+"/"+k)).reduce((a,b) => a+b)
    }
    dir_and_size.push({
        path: dir,
        size: files + dir_file_sizes
    })
    return files + dir_file_sizes
}

const total_used = getFileSizePlusInnerDirectories(file_system)
const free_space = 70000000 - total_used
const need_to_delete = 30000000 - free_space
mapDirSizes(file_system, "")

let sorted = dir_and_size.map(p => ({path: p.path, diff: p.size-need_to_delete, size: p.size})).filter(n => n.diff >= 0).sort((a,b) => a.diff-b.diff)

console.log(sorted[0])
console.log("Total Size of Directory to delete: ", sorted[0].size)