import range from "@/functions/rangeUtil";

let filterNachSpielerLastArgument = -1
let filterNachSpielerLastResult = -1
let filterNachSpieler = (spiele, n) => {
    console.log("filterNachSpieler");
    // if (spiele.length===0) return []
    // if (n===filterNachSpielerLastArgument) return filterNachSpielerLastResult
    // filterNachSpielerLastArgument = n

    spiele = spiele.filter(({players}) => players == null || players.max >= n && players.min <= n)

    // filterNachSpielerLastResult = spiele
    return spiele
}
let filterNachDauer = (spiele, dauerArray) => {
    console.log("filterNachDauer");
    let aktiveFilter = dauerArray.filter(({active}) => active)
    if (aktiveFilter.length === 0) return spiele
    let result = []
    for (let spiel of spiele) {
        let getroffen = false
        for (let f of aktiveFilter) {
            if (range.rangeIntersect(spiel.duration, f)) {
                getroffen = true
            }
        }
        if (getroffen)
            result.push(spiel)

    }
    return result
}
let filterNachName = (spiele, input) => {
    console.log("filterNachName")
    if (input === "") return spiele
    return spiele.filter(spiel => spiel.name.toLowerCase().includes(input.toLowerCase()))
}

export {filterNachSpieler, filterNachDauer, filterNachName}
