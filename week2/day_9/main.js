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

const testData2 = fs
    .readFileSync(path.join(__dirname, 'testData2.txt'), 'utf8')
    .toString()
    .split('\n')

const runData = data

function updatedPos(currentPos, direction) {
    const [x, y] = currentPos
    switch (direction) {
        case "R":
            return [x + 1, y]
        case "U":
            return [x, y + 1]
        case "L":
            return [x - 1, y]
        case "D":
            return [x, y - 1]
        default:
            console.log("something went wrong")
            break;
    }
}

/*
    tPos: tail/part of tail that is possibly being moved
    newHPos: head/ part of rope that is being followed
*/
function getNewTailPos(tPos, newHPos, direction) {
    const [tX, tY] = tPos
    const [newHX, newHY] = newHPos

    const xDistance = Math.abs(newHX - tX)
    const yDistance = Math.abs(newHY - tY)

    // distance from head is too big -> move
    if (xDistance > 1 || yDistance > 1) {
        // in same row or column
        if (tX === newHX || tY === newHY) {
            return updatedPos(tPos, direction)
        } else {
            if (direction === "U" || direction === "D") {
                // move to correct column + 1 step vertically according to direction
                return updatedPos([newHX, tY], direction)
            } else {
                // move to correct row + 1 step horizontally according to direction
                return updatedPos([tX, newHY], direction)
            }
        }
    }
    return tPos
}

function getNewPosition(follower, leader) {
    const [fX, fY] = follower
    const [lX, lY] = leader
    const xDistance = lX - fX
    const yDistance = lY - fY
    const xAbsDist = Math.abs(xDistance)
    const yAbsDist = Math.abs(yDistance)
    let newFollowerPos = [...follower]
    const shouldMoveVertically = (Math.abs(xDistance) > 1 && Math.abs(yDistance) > 0) || (Math.abs(xDistance) > 0 && Math.abs(yDistance) > 1)
    if (shouldMoveVertically || xAbsDist > 1) {
        newFollowerPos[0] += 1 * (xDistance / Math.abs(xDistance))
    }
    if (shouldMoveVertically || yAbsDist > 1) {
        newFollowerPos[1] += 1 * (yDistance / Math.abs(yDistance))
    }

    return newFollowerPos
}

function part1() {

    let uniquePositions = [[0, 0]]
    // [x, y]
    let currentPosH = [0, 0]
    let currentPosT = [0, 0]
    runData.forEach(move => {
        const [direction, steps] = move.split(" ")
        const numSteps = Number(steps)
        for (let i = 0; i < numSteps; i++) {
            currentPosH = updatedPos(currentPosH, direction)
            currentPosT = getNewTailPos(currentPosT, currentPosH, direction)
            if (uniquePositions.findIndex(pos => pos[0] === currentPosT[0] && pos[1] === currentPosT[1]) < 0) {
                uniquePositions.push(currentPosT)
            }
        }

    })

    console.log("Part 1: Number of unique position: ", uniquePositions.length)
}

function part2() {
    let uniquePositions = [[0, 0]]
    // [x, y]
    let rope = Array(10).fill([0, 0])

    /* for logging
    let higestX = 0
    let lowestX = 0
    let higestY = 0
    let lowestY = 0
    */

    runData.forEach(move => {
        const [direction, steps] = move.split(" ")
        const numSteps = Number(steps)
        // for each step
        for (let i = 0; i < numSteps; i++) {
            const currentHPosition = rope[0]
            rope[0] = updatedPos(currentHPosition, direction)
            // for each part of rope tail
            for (let j = 1; j < rope.length; j++) {
                const currentTPart = rope[j]
                const partInFront = rope[j - 1]
                const updatedTPos = getNewPosition(currentTPart, partInFront, direction === "D" || direction === "U")

                if (currentTPart !== updatedTPos) {
                    rope[j] = updatedTPos
                }

                // if tail and if pos not in unique array
                if (j === rope.length - 1 && uniquePositions.findIndex(pos => pos[0] === updatedTPos[0] && pos[1] === updatedTPos[1]) < 0) {
                    uniquePositions.push(updatedTPos)
                }
            }

            /* for logging
            const currHead = rope[0]
            if (currHead[0] > higestX) {
                higestX = currHead[0]
            }
            if (currHead[0] < lowestX) {
                lowestX = currHead[0]
            }
            if (currHead[1] > higestY) {
                higestY = currHead[1]
            }
            if (currHead[1] < lowestY) {
                lowestY = currHead[1]
            }
            */
        }
    })

    /* movement log
    for (let row = higestY; row >= (lowestY); row--) {
        let rowLog = ""
        for (let col = higestX; col >= (lowestX); col--) {
            const currPos = [col, row]
            if (uniquePositions.some(pos => pos[0] === currPos[0] && pos[1] === currPos[1])) {
                rowLog += "# "
            } else {
                rowLog += ". "
            }
        }
        console.log(rowLog)
    }
    */

    console.log("Part 2: Number of unique position: ", uniquePositions.length)
}

part1()
part2()
