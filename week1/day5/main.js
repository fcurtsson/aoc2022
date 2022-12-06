const path = require('path');
const fs = require('fs');

const data = fs
    .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
    .toString()
    .split('\n')

const testData = fs
    .readFileSync(path.join(__dirname, 'testData.txt'), 'utf8')
    .toString()
    .split('\n')

const testStacks = ["ZN", "MCD", "P"]
const stacks = ["RGJBTVZ", "JRVL", "SQF", "ZHNLFVQG", "RQTJCSMW", "SWTCHF", "DZCVFNJ", "LGZDWRFQ", "JBWVP"]

const runData = data
const runStack = stacks

function moveCrates(crateMover9001) {
    let stacks = [...runStack]

    runData.forEach(move => {
        const moveNumbers = move.replace("move ", "").replace(" from ", ",").replace(" to ", ",")
        const moveDef = moveNumbers.split(',')
        const from = moveDef[1] - 1
        const to = moveDef[2] - 1
        const splitIndex = stacks[from].length - moveDef[0]
        
        const cratesToMove = crateMover9001 ? stacks[from].substring(splitIndex) : stacks[from].substring(splitIndex).split("").reverse().join("")
        stacks[to] = stacks[to] + cratesToMove
        stacks[from] = stacks[from].substring(0, splitIndex)
    })
    return stacks
}

function part1() {

    const rearrangedCrates = moveCrates()

    const topCrates = rearrangedCrates.reduce((tops, crate) => {
        tops += crate.charAt(crate.length - 1)
        return tops
    }, '')

    console.log("Part 1: Top crates: ", topCrates)
}

function part2() {

    const rearrangedCrates = moveCrates(true)

    const topCrates = rearrangedCrates.reduce((tops, crate) => {
        tops += crate.charAt(crate.length - 1)
        return tops
    }, '')

    console.log("Part 2: Top crates (CrateMover 9001): ", topCrates)
}

part1()
part2()
