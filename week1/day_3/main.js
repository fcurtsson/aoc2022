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

function getItemPriority(item) {
    const ascii = item.charCodeAt(0)
    if (ascii > 90) {
        // reduce ascii to 0 + add 1 according to prio list
        return ascii - 97 + 1
    }
    // reduce ascii to 0 + add 27 according to prio list
    return ascii - 65 + 27
}

function part1() {

    const prioritySum = runData.reduce((sum, rucksack) => {
        const comp1 = rucksack.slice(0, rucksack.length / 2).split("")
        const comp2 = rucksack.slice(rucksack.length / 2).split("")
        const duplicate = comp1.find(item => comp2.includes(item))
        if (duplicate) {
            const prio = getItemPriority(duplicate)

            sum += prio
        }
        return sum
    }, 0)

    console.log("Part 1: Priority sum equals: ", prioritySum)
}

function part2() {

    let prioritySum = 0
    for (let i = 0; i < runData.length; i += 3) {
        const [g1, g2, g3] = [...runData].splice(i, i+3).map(group => group.split(""))
        const duplicate = g1.find(item => g2.includes(item) && g3.includes(item))
        if (duplicate) {
            const prio = getItemPriority(duplicate)
            prioritySum += prio
        }
    }

    console.log("Part 2: Priority sum equals: ", prioritySum)
}

part1()
part2()
