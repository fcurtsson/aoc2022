const path = require('path');
const fs = require('fs');

const data = fs
    .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
    .toString()

const testData = fs
    .readFileSync(path.join(__dirname, 'testData.txt'), 'utf8')
    .toString()

const runData = data

function isSeqMarker(sequence) {
    return sequence.every(char => sequence.filter(val => val === char).length === 1)
}

function findMarker(stream, numOfDistincts) {
    let charsBeforeMarker
    for (let i = numOfDistincts; i < stream.length - numOfDistincts; i++) {
        const sequence = stream.slice(i - numOfDistincts, i)
        const isMarker = isSeqMarker(sequence)
        if (isMarker) {
            charsBeforeMarker = i
            break
        }
    }
    return charsBeforeMarker
}

function part1() {
    
    const stream = runData.split("")
    const charsBeforeMarker = findMarker(stream, 4)

    console.log("Part 1: Characters before start-of-packet marker: ", charsBeforeMarker)
}

function part2() {
    
    const stream = runData.split("")
    const charsBeforeMarker = findMarker(stream, 14)

    console.log("Part 1: Characters before start-of-message marker: ", charsBeforeMarker)
}

part1()
part2()
