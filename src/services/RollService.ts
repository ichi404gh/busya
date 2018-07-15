class RollServce {
    roll(): number
    roll(min: number, max: number): number

    roll(min?: number, max?: number) {
        if(min === undefined) min = 1
        if(max === undefined) max = 10

        if(min > max){
            [min, max] = [max, min]
        }
        return Math.floor(Math.random() * (max+1 - min) ) + min

    }
}

export default new RollServce()