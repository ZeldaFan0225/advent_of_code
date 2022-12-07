const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8")
const lines = input.split("\n")

let current_dir = ""
let file_system = {}

for(let line of lines) {
    if(line.startsWith("$")) {
        if(line.startsWith("& cd")) {
            // cd
            let path = line.replace("$ cd ", "")
            if(path === "..") {
                current_dir = current_dir.split("/").splice(0, -1)
            } else {
                current_dir += `/${path}`
            }
        }
    } else if(line.startsWith("dir")) {
        let dir = line.replace("dir ", "")
        //add dir to CURRENT dir
        // dir
    } else {
        let [size, name] = line.split(" ")
        // file
        //add file to CURRENT dir

    }
}