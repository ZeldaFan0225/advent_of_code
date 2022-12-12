const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")
const sections = input.split("\n")

const fully_contains = sections.map(s => {
    const [elf_1, elf_2] = s.split(",")
    const [elf_1_start, elf_1_end] = elf_1.split("-").map(v => parseInt(v))
    const [elf_2_start, elf_2_end] = elf_2.split("-").map(v => parseInt(v))
    return Number(elf_2_start < elf_1_start ? (elf_1_start <= elf_2_end) : (elf_2_start <= elf_1_end))
})

const result = fully_contains.reduce((a, b) => a + b)
console.log(result)