import 'mocha'
import RollModule from '.'
import { expect } from 'chai'

const nameof = <T>(name: keyof T) => name

describe("RollModule", ()=>{
    it("should properly parse command", ()=>{
        const m = new RollModule()
        
        // @ts-ignore // leak private method for tests
        const f : (text:string) => number = m.GetRollFromCommand

        let res = f("/roll")
        expect(res).gte(1).and.lte(10)

        res = f("/roll 2")
        expect(res).gte(1).and.lte(2)

        res = f("/roll 50 60")
        expect(res).gte(50).and.lte(60)

        for (let i = 0; i < 1000; i++) {
            res = f("/roll 3d6")
            expect(res).gte(3).and.lte(18)                
        }
    })
})