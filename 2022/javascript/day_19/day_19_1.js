const {readFileSync} = require("fs")

const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

const blueprints = input.split("\n").map(l => {
    const [_, ore_robot_clay, clay_robot_ore, obsidian_robot_ore, obsidian_robot_clay, geode_robot_ore, geode_robot_obsidian] = l.match(/(\d+)/g).map(n => parseInt(n))
    return {
        ore: {
            amount: 1,
            mined: 0,
            clay: ore_robot_clay
        },
        clay: {
            amount: 0,
            mined: 0,
            ore: clay_robot_ore
        },
        obsidian: {
            amount: 0,
            mined: 0,
            ore: obsidian_robot_ore,
            clay: obsidian_robot_clay
        },
        geode: {
            amount: 0,
            mined: 0,
            ore: geode_robot_ore,
            obsidian: geode_robot_obsidian
        }
    }
})

for(let min = 0; min < 24; ++min) {
    blueprints.forEach((blueprint) => {
        
    })
}

console.log(blueprints)