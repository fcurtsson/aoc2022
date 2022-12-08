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

function getDirData(commands, flattenedPath) {
    const files = []
    const children = []
    while (commands[0] && commands[0].charAt(0) !== "$") {
        const current = commands.shift().split(' ')
        if (current[0] !== 'dir') {
            files.push({ name: current[1], size: Number(current[0]) })
        } else {
            children.push(`${flattenedPath}_${current[1]}`)
        }
    }
    return [files, children]
}

function createDirectory(commands) {
    let commandsCopy = [...commands]
    let directory = {}
    let currentDirPath = []
    while (commandsCopy.length) {
        const output = commandsCopy.shift()
        const formatted = output.split(' ')
        if (formatted[0] === '$') {
            const action = formatted[1]
            if (action === 'cd') {
                let change = formatted[2]
                // move one level up in path
                if (change === '..') {
                    currentDirPath.splice(currentDirPath.length - 1, 1)
                } else {
                    currentDirPath.push(change)
                }
            } else {
                // action === 'ls'
                const currentDirKey = currentDirPath.join('_')
                const [files, children] = getDirData(commandsCopy, currentDirKey)
                directory[currentDirKey] = { files, children }
            }
        }
    }

    return directory
}

function getDirSize(dirKey, directory) {

    const currentDir = directory[dirKey]
    const directFileTotal = currentDir.files.reduce((sum, file) => sum += file.size, 0)

    let childFileTotals = 0
    if (currentDir.children.length) {
        childFileTotals = currentDir.children.reduce((sum, childKey) => {
            const childSize = getDirSize(childKey, directory)
            sum += childSize
            return sum
        }, 0)
    }
    return directFileTotal + childFileTotals
}

function findDirsSizesBelowLimit(directory, limit) {

    const sizesOverLimit = []
    Object.keys(directory).forEach(key => {
        const size = getDirSize(key, directory)
        if (size <= limit) {
            sizesOverLimit.push(size)
        }
    })
    return sizesOverLimit
}

function part1() {

    const dir = createDirectory(runData)
    const sizesBelowLimit = findDirsSizesBelowLimit(dir, 100000)
    const sumOfSizes = sizesBelowLimit.reduce((sum, size) => sum += size, 0)

    console.log("Part 1: Sum of directories with sizes below limit: ", sumOfSizes)
}

function part2() {

    console.log("Part 2: ")
}

part1()
part2()
