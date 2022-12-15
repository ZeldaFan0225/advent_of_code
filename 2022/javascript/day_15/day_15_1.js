const {readFileSync} = require("fs")
const input = readFileSync("./input.txt", "utf-8").replace(/\r/g, "")

let lowest_x = 0
let highest_x = 0
const check_row = 2000000

const pairs = input.split("\n").map(l => {
    const [sensor_x, sensor_y, beacon_x, beacon_y] = l.match(/(-?\d+)/g).map(n => parseInt(n))
    const distance = Math.abs((sensor_x) - (beacon_x)) + Math.abs(sensor_y - beacon_y)
    if(sensor_x < lowest_x) lowest_x = sensor_x
    if((beacon_x-distance) < lowest_x) lowest_x = (beacon_x-distance)
    if(sensor_x > highest_x) highest_x = sensor_x
    if((beacon_x+distance) > highest_x) highest_x = (beacon_x+distance)
    return {
        sensor: {
            x: sensor_x,
            y: sensor_y
        },
        beacon: {
            x: beacon_x,
            y: beacon_y
        },
        distance
    }
})

function getDistance(coord_1, coord_2) {
    return Math.abs(coord_1.x - coord_2.x) + Math.abs(coord_1.y - coord_2.y)
}

const result_arr = Array.from({length: highest_x-lowest_x+1}, () => 0)
.map((_, i) => {
    const close = pairs.find(p => {
        const distance = getDistance(p.sensor, {x: i+lowest_x, y: check_row})
        return distance <= p.distance
    })
    if(close?.beacon.x === i+lowest_x && close?.beacon.y === check_row) return 0;
    if(close) return 1
    return 0
})

console.log("Coordinates where a beacon can't be placed:", result_arr.reduce((a,b) => a+b))