import 'mocha'
import { expect } from 'chai'

import RollService from './RollService'

describe('RollService', function () {

    describe('#roll', function () {

        it('should return value between 1 and 10 if no params', () => {
            expect(RollService.roll()).to.gte(1).and.lte(10)
        })

        it('should return value between params if params presented', () => {
            expect(RollService.roll(99, 100)).gte(99).and.lte(100)
        })

        it('should return param if params are equals', () => {
            expect(RollService.roll(55, 55)).eq(55)
        })

        it('should sometimes return max value', function () {
            this.retries(1000)
            expect(RollService.roll(4, 5)).eq(5)
        })

        it('should sometimes return min value', function () {
            this.retries(1000)
            expect(RollService.roll(4, 5)).eq(4)
        })

        describe('should swap params when min > max', () => {
            it('should sometimes return max value', function () {
                this.retries(1000)
                expect(RollService.roll(5, 4)).eq(5)
            })

            it('should sometimes return min value', function () {
                this.retries(1000)
                expect(RollService.roll(5, 4)).eq(4)
            })
        })

    })
})