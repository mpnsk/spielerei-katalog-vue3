import assert from 'assert'
import r from '../../src/functions/rangeUtil'
import games from './games.json'
import range from "@/functions/rangeUtil";
import {filterNachDauer, filterNachSpieler} from "@/components/FilterFunctions";

describe('filter', function () {
    it('duration', function () {
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
    it('players', function () {
        let players = 9
        let gefiltert = filterNachSpieler(games, players);
        // console.log(gefiltert);
        // console.log(gefiltert.length);
    })
})
