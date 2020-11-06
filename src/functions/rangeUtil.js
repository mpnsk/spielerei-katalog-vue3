let funs = {
    sortByMin(r1, r2) {
        let lower
        let upper
        if (r1.min < r2.min) {
            lower = r1
            upper = r2
        } else {
            lower = r2
            upper = r1
        }
        return {lower, upper}
    },
    rangeIntersect(r1, r2) {
        let byMin = this.sortByMin(r1,r2);
        let lower = byMin.lower
        let upper = byMin.upper
        return ((lower.min < upper.min &&
            lower.max > upper.min)
            ||
            (lower.min < upper.max &&
                lower.max > upper.max))
    },
    rangeContain(r1, r2) {
        let byMin = this.sortByMin(r1,r2);
        let smaller = byMin.upper
        let bigger = byMin.lower
        return bigger.min < smaller.min &&
            bigger.max > smaller.max
    }

};
export default funs
