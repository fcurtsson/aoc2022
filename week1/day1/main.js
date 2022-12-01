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

const runData = data

function getCalsPerElf() {
    const calPerElf = []
    let currentElfCount = 0
    runData.forEach((item, index) => {
        if (item === '') {
            calPerElf.push(currentElfCount)
            currentElfCount = 0
        } else {
            currentElfCount += Number(item)
            if (index === runData.length - 1) {
                calPerElf.push(currentElfCount)
            }
        }
    })
    return calPerElf
}

function part1() {

    const calsPerElf = getCalsPerElf()
    const maxCalOnElf = Math.max(...calsPerElf)
    console.log("Part 1: Max calories carried by one elf: ", maxCalOnElf)
}

function part2() {

    const calsPerElves = getCalsPerElf()
    calsPerElves.sort((a, b) => b - a)
    const topThreeElves = calsPerElves.slice(0, 3)
    const topThreeSum = topThreeElves.reduce((sum, elf) => sum + elf, 0)

    console.log("Part 2: Total calories of top three elves: ", topThreeSum)
}

part1()
part2()