import assert from 'assert'
import r from '../../src/functions/rangeUtil'

describe('range intersect', function () {
    it('should fail on non intersect', function () {
        var nonIntersect = r.rangeIntersect({min: 1, max: 3}, {min: 4, max: 6})
        assert.strictEqual(nonIntersect, false)
    })
    it('should work on intersect', function () {
        var intersect = r.rangeIntersect({min: 1, max: 4}, {min: 3, max: 6})
        assert.strictEqual(intersect, true)
    })
})
describe('range contain', function () {
    it('should work on contain', function () {
        const contain = r.rangeContain({min: 1, max: 6}, {min: 3, max: 4});
        assert.strictEqual(contain, true)
    })
    it('should fail on non contain', function () {
        const nonContain = r.rangeContain({min: 1, max: 5}, {min: 4, max: 6});
        assert.strictEqual(nonContain, false)
    })
})
