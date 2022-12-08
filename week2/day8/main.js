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

function checkIfVisibleInCol(trees, tree, rowIndex, colIndex) {
    let tallestUp = 0
    let tallestDown = 0
    for (let i = 0; i < trees.length; i++) {
        const treeInCol = trees[i].split("")[colIndex]
        if (i < rowIndex) {
            if (treeInCol > tallestUp) {
                tallestUp = treeInCol
            }
        }
        if (i > rowIndex) {
            if (treeInCol > tallestDown) {
                tallestDown = treeInCol
            }
        }
    }
    return tree > tallestUp || tree > tallestDown
}

function getVerticalTrees(trees, rowIndex, colIndex) {
    let up = []
    let down = []
    for (let i = 0; i < trees.length; i++) {
        const treeInCol = trees[i].split("")[colIndex]
        if (i < rowIndex) {
            up.push(treeInCol)
        }
        if (i > rowIndex) {
            down.push(treeInCol)
        }
    }
    return [up.reverse(), down]
}

function getTallerTreeDistance(treeline, treeSize) {
    let viewHasBeenBlocked = false
    const visibleTrees = treeline.reduce((visible, tree) => {
        if (viewHasBeenBlocked) {
            return visible
        }
        visible.push(tree)
        if (tree >= treeSize) {
            viewHasBeenBlocked = true
        }
        return visible
    }, [])

    return visibleTrees.length
}

function part1() {

    let visibleTrees = 0
    runData.forEach((row, rowIndex) => {
        // if on edge
        if (rowIndex === 0 || rowIndex === row.length - 1) {
            visibleTrees += row.length

        } else {
            const treesInRow = row.split("")
            treesInRow.forEach((tree, colIndex) => {
                // if on edge
                if (colIndex === 0 || colIndex === runData.length - 1) {
                    visibleTrees++
                } else {
                    const left = treesInRow.slice(0, colIndex)
                    const right = treesInRow.slice(colIndex + 1)
                    const isVisibleOnRow = left.every(t => tree > t) || right.every(t => tree > t)
                    if (isVisibleOnRow) {
                        visibleTrees++
                    } else {
                        const isVisibleInCol = checkIfVisibleInCol(runData, tree, rowIndex, colIndex)
                        if (isVisibleInCol) {
                            visibleTrees++
                        }
                    }
                }
            })
        }
    })

    console.log("Part 1: Number of trees visible in woods: ", visibleTrees)
}

function part2() {

    let highestScore = 0
    runData.forEach((row, rowIndex) => {

        const treesInRow = row.split("")
        treesInRow.forEach((tree, colIndex) => {
            const left = treesInRow.slice(0, colIndex).reverse()
            const right = treesInRow.slice(colIndex + 1)
            const [up, down] = getVerticalTrees(runData, rowIndex, colIndex)
            const scenicScore = [left, right, up, down].reduce((sum, treeline) => sum *= getTallerTreeDistance(treeline, tree, rowIndex === 3 && colIndex === 2), 1)
            if (scenicScore > highestScore) {
                highestScore = scenicScore
            }
        })
    })

    console.log("Part 2: Higest scenic score: ", highestScore)
}

part1()
part2()
