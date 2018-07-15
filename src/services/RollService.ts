function randInclusive(min: number, max: number): number{
    return Math.floor(Math.random() * (max + 1 - min)) + min
}
class RollServce {
    roll(): number
    roll(min: number, max: number): number

    roll(min?: number, max?: number) {
        if (min === undefined) min = 1
        if (max === undefined) max = 10

        if (min > max) {
            [min, max] = [max, min]
        }
        return randInclusive(min, max)

    }

    rollDice(number: number, max: number): number {
        let res = 0
        for (let i = 0; i < number; i++) {
            res += randInclusive(1, max)
        }
        return res
    }
}

export default new RollServce()