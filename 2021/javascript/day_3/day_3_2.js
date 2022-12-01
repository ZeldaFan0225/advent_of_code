const file = require("fs")
    .readFileSync(process.cwd() + "/input.txt")

let bits = file.toString("utf-8")
//let bits = "00100\r\n11110\r\n10110\r\n10111\r\n10101\r\n01111\r\n00111\r\n11100\r\n10000\r\n11001\r\n00010\r\n01010"
    .split("\r\n")


const findCommon = (bts) => {
    let count = Array(12).fill(0)
    bts
    .forEach(v => {
            let bts = v.split("")
            bts
            .forEach((v, i) => {
                if(!!Number(v)) ++count[i]
            })
    })

    let gamma = ""
    count
    .forEach((v) => {
        gamma += v >= (bts.length-v) ? "1" : "0"
    })
    return gamma
}


const findUnCommon = (bts) => {
    let count = Array(12).fill(0)
    bts
    .forEach(v => {
            let bts = v.split("")
            bts
            .forEach((v, i) => {
                if(!!Number(v)) ++count[i]
            })
    })

    let res = ""
    count
    .forEach((v) => {
        res += v >= (bts.length-v) ? "0" : "1"
    })
    return res
}



let oxygen, scrubber = ""
, index = 0

let scrubberbits = bits.slice()

for(let i = 0; i < bits[0].length; ++i) {
    let bit = findCommon(bits)[i]
    if(!bits.filter(b => b[index] === bit).length) {
        bits = [bits.reverse().find(b => b[index] === bit)]
        oxygen = bits[0]
        break
    } else {
        bits = bits.filter(b => b[index] === bit)
        ++index
        if(bits.length === 1) {
            oxygen = bits[0]
            break
        }
    }
}

index = 0

for(let i = 0; i < scrubberbits[0].length; ++i) {
    console.log()
    let bit = findUnCommon(scrubberbits)[i]
    if(!scrubberbits.filter(b => b[index] === bit).length) {
        scrubberbits = [scrubberbits.reverse().find(b => b[index] === bit)]
        scrubber = scrubberbits[0]
        break
    } else {
        scrubberbits = scrubberbits.filter(b => b[index] === bit)
        ++index
        if(scrubberbits.length === 1) {
            scrubber = scrubberbits[0]
            break
        }
    }
}

console.log(parseInt( oxygen, 2 ))
console.log(parseInt( scrubber, 2 ))
console.log(parseInt( oxygen, 2 ) * parseInt( scrubber, 2 ))