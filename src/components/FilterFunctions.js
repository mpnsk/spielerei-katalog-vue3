import range from "@/functions/rangeUtil";

let filterNachSpieler = (spiele, n) => {
    spiele = spiele.filter(({players}) => players == null || players.max >= n && players.min <= n)
    return spiele
}
let filterNachDauer = (spiele, dauerArray) => {
    let aktiveFilter = dauerArray.filter(({active}) => active)
    for (let f of aktiveFilter)
        spiele = spiele.filter(spiel => range.rangeIntersect(spiel.duration, f))
    return spiele
}

export {filterNachSpieler, filterNachDauer}
