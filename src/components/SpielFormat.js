export default {
    display(x) {
        if (x == undefined || x.min < 0 || x.max < 0)
            return '?'
        if (x.min === x.max)
            return x.min
        if (x.max === 99 | x.max === 999)
            return x.min + "+";
        else
            return x.min + " - " + x.max
    }
}
