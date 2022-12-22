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

function checkForSignalStrength(cycleCount, signalStrengths, register) {
    if ((cycleCount + 20) % 40 === 0) {
        console.log("----- cycleCount: ", cycleCount, " : ", register)
        const strength = cycleCount * register
        console.log("register: ", register)
        console.log("strength: ", strength)

        signalStrengths.push(strength)
        console.log("signalStrengths: ", signalStrengths)

    }
    return signalStrengths
}

function part1() {

    let cycleCount = 0
    let register = 1
    const signalStrengths = []
    runData.forEach(cycle => {
        cycleCount++
        if (cycle === 'noop') {
            checkForSignalStrength(cycleCount, signalStrengths, register)
        }
        if (cycle.startsWith("addx")) {
            checkForSignalStrength(cycleCount, signalStrengths, register)
            cycleCount++
            checkForSignalStrength(cycleCount, signalStrengths, register)
            const [_, value] = cycle.split(" ")
            register += Number(value)
        }
    })

    const sum = signalStrengths.reduce((sum, signal) => sum += signal)

    console.log("Part 1: The sum of the six signal strenghts are: ", sum)
}

function part2() {

    console.log("Part 2: ")
}

part1()
part2()
