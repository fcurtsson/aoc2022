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

// X = rock, Y = paper, X = scissors -> score = index + 1
const shapeScoreByIndex = ['X', 'Y', 'Z']
// order or array: [loses, draws, wins] -> score = index * 3
const playScoreByIndexDict = {
    'X': ['B', 'A', 'C'],
    'Y': ['C', 'B', 'A'],
    'Z': ['A', 'C', 'B']
}

function getScoreOfRound(p1, p2) {

    const shapeScore = shapeScoreByIndex.findIndex(shape => shape === p2) + 1

    const playScoreByIndex = playScoreByIndexDict[p2]
    const playScore = playScoreByIndex.findIndex(play => play === p1) * 3

    return shapeScore + playScore
}

function part1() {

    const totalScore = runData.reduce((allRounds, round) => {
        const [p1, p2] = round.split(" ")
        const score = getScoreOfRound(p1, p2)
        allRounds += score
        return allRounds
    }, 0)
    
    console.log("Part 1: Total score: ", totalScore)
}

function part2() {
    
    console.log("Part 2: ")
}

part1()
part2()
