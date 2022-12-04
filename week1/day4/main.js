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

function getSectionsFromPair(pair) {
    const [elf1, elf2] = pair.split(",")
    sec1 = elf1.split("-").map(num => Number(num))
    sec2 = elf2.split("-").map(num => Number(num))
    return [sec1, sec2]
}

// sec type: [start, end]
function checkFullSectionOverlap(sec1, sec2) {
    const [start1, end1] = sec1
    const [start2, end2] = sec2

    if (start1 < start2) {
        return end2 <= end1
    }
    if (start2 < start1) {
        return end1 <= end2
    }

    // start is same and one will always contain the other
    return true
}

function getSectionArray(section) {
    const [start, end] = section
    let sectionArray = [...Array(end - start + 1).keys()].map(num => num + start)
    return sectionArray
}

// sec type: [start, end]
function checkSectionOverlap(sec1, sec2) {
    const section1 = getSectionArray(sec1)
    const section2 = getSectionArray(sec2)

    return section1.some(num => section2.includes(num))
}

function part1() {

    const sectionOverlaps = runData.reduce((overlaps, pair) => {
        const [sec1, sec2] = getSectionsFromPair(pair)
        const hasOverlap = checkFullSectionOverlap(sec1, sec2)
        if (hasOverlap) {
            overlaps += 1
        }
        return overlaps
    }, 0)

    console.log("Part 1: Number of full section overlaps: ", sectionOverlaps)
}

function part2() {

    const sectionOverlaps = runData.reduce((overlaps, pair) => {
        const [sec1, sec2] = getSectionsFromPair(pair)
        const hasOverlap = checkSectionOverlap(sec1, sec2)
        if (hasOverlap) {
            overlaps += 1
        }
        return overlaps
    }, 0)

    console.log("Part 2: Number of section overlaps: ", sectionOverlaps)
}

part1()
part2()
