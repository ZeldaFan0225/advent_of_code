let input = require("fs")
    .readFileSync(process.cwd() + "/input.txt")
    .toString("utf-8")
//let input = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`
    .split("\r\n")
    .map(v => v.split(" | ").map(va => va.split(" ")))



let res = 0
for(let segments of input) {
    let segs = []
    segs[3] = segments[0].find(v => v.length === 4).split("").find(v => segments[0].filter(va => va.length === 5).every(val => val.includes(v)))
    segs[1] = segments[0].find(v => v.length === 4).split("").find(v => ![segs[3], ...segments[0].find(v => v.length === 2).split("")].includes(v))
    segs[0] = segments[0].find(v => v.length === 3).split("").find(v => !segments[0].find(v => v.length === 2).split("").includes(v))
    segs[5] = segments[0].find(v => v.length === 5 && [segs[0], segs[1], segs[3]].every(asdf => v.split("").includes(asdf))).split("").find(v => !segs.includes(v) && segments[0].find(va => va.length === 2).split("").includes(v))
    segs[6] = segments[0].find(v => v.length === 5 && [segs[0], segs[1], segs[3], segs[5]].every(asdf => v.split("").includes(asdf))).split("").find(v => !segs.filter(a => a).includes(v))
    segs[2] = segments[0].find(v => v.length === 2).split("").find(v => !segs.filter(a => a).includes(v))
    segs[4] = segments[0].find(v => v.length === 7).split("").find(v => !segs.filter(a => a).includes(v))
    
    let nums = []
    segments[1].forEach(segment => {
        switch(segment.length) {
            case 2 : {nums.push(1); break}
            case 3 : {nums.push(7); break}
            case 4 : {nums.push(4); break}
            case 7 : {nums.push(8); break}
            case 5 : {
                if(segment.split("").includes(segs[2]) && segment.split("").includes(segs[5])) {
                    nums.push(3)
                    break
                } else if (segment.split("").includes(segs[2])) {
                    nums.push(2)
                    break
                } else {
                    nums.push(5)
                    break
                }
            }
            case 6 : {
                if(!segment.split("").includes(segs[3])) {
                    nums.push(0)
                    break
                } else if(segment.split("").includes(segs[2])) {
                    nums.push(9)
                    break
                } else {
                    nums.push(6)
                    break
                }
            }
        }
    })
    res += Number(nums.join(""))
}

console.log(res)