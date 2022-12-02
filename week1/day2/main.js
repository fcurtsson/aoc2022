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
// part 2: outcomes ordered to correspond to playScoreByIndexDict from part 1
const orderedOutcomes = ['X', 'Y', 'Z']

function getScoreOfRound(p1, p2) {

    const shapeScore = getShapeScore(p2)
    const playScore = getPlayScore(p1, p2)

    return shapeScore + playScore
}

function getShapeScore(shape) {
    return shapeScoreByIndex.findIndex(sh => sh === shape) + 1
}

// p1 = their play, p2 = your play
function getPlayScore(p1, p2) {
    const playScoreByIndex = playScoreByIndexDict[p2]
    return playScoreByIndex.findIndex(play => play === p1) * 3
}

function getShapeByOutcome(p1, outcome) {
    const outcomeIndex = orderedOutcomes.findIndex(oc => oc === outcome)

    const shape = Object.keys(playScoreByIndexDict).find(p2 => {
        const sortedPlays = playScoreByIndexDict[p2]

        if (sortedPlays[outcomeIndex] === p1) {
            return true
        }
        return false
    })
    return shape
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

    const totalScore = runData.reduce((allRounds, round) => {
        const [p1, outcome] = round.split(" ")
        const p2 = getShapeByOutcome(p1, outcome)
        const score = getScoreOfRound(p1, p2)
        allRounds += score
        return allRounds
    }, 0)

    console.log("Part 2: Total score: ", totalScore)
}

part1()
part2()
