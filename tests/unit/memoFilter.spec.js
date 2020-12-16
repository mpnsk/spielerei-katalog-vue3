import r from '../../src/functions/rangeUtil'
import games from './games.json'
import range from "@/functions/rangeUtil";
import {filterNachDauer, filterNachSpieler} from "@/components/FilterFunctions";
import {Memoizer} from "@/components/Util";

test('duration', function () {
    let dauer = [
        {active: false, text: 'bis 30 Min', min: 0, max: 30},
        {active: false, text: '60 Min', min: 60, max: 60},
        {active: false, text: '90 Min', min: 90, max: 90},
        {active: false, text: '120+ Min', min: 120, max: 120},
    ]
    let result = []
    result = games
    result = filterNachDauer(result, dauer)
    // console.log(result);
    // console.log(result.length);
})
test('players', function () {
    let players = 9
    let memo = Memoizer.memo(filterNachSpieler);
    let memo1 = memo(games, 4);
    let memo2 = memo(games, 4);
    let memo3 = memo(games, 4);
    let memo4 = memo(games, 4);
    // console.log(memo4);
    console.log("done")
    // let gefiltert = filterNachSpieler(games, players);
    // console.log(gefiltert);
    // console.log(gefiltert.length);
})
