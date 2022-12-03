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

const runData = testData

function part1() {
    
    console.log("Part 1: ")
}

function part2() {
    
    console.log("Part 2: ")
}

part1()
part2()
