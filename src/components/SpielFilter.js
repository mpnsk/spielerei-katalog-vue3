import {computed, reactive} from "@vue/reactivity";
import range from "@/functions/rangeUtil";
import store from "@/GameStore";

let spiele = store.asArray
let filter = reactive({
    dauer: [
        {active: false, text: 'bis 30 Min', min: 0, max: 30},
        {active: false, text: '60 Min', min: 60, max: 60},
        {active: false, text: '90 Min', min: 90, max: 90},
        {active: false, text: '120+ Min', min: 120, max: 120},
    ],
    kategorie: [
        {active: false, text: 'Strategie'},
        {active: false, text: 'Builder'},
        {active: false, text: 'Knobel'},
        {active: false, text: 'Quiz'},
        {active: false, text: 'Karten'},
        {active: false, text: 'Klassiker'},
        {active: false, text: 'Familienspiel'},
        {active: false, text: 'Partyspiel'},
        {active: false, text: 'Gamer\'s Games'},
        {active: false, text: 'Wirtschaftsspiel'},
        {active: false, text: 'Würfelspiel'},
    ],
    spieler: 3,
    name: "example name"
});

const renderedGames = reactive([])
const filteredGames = computed(() => {

    let afterFilter = spiele.filter(spiel => {
        let duration = spiel.duration;
        let anyFilterSelected = filter.dauer[0].active || filter.dauer[1].active || filter.dauer[2].active || filter.dauer[3].active;
        let noFilterSelected = !anyFilterSelected;
        if (duration == undefined) {
            // console.log("undefined duration " + spiel.name)
            return noFilterSelected
        }
        if (duration.min === undefined) {
            // console.log("undefined duration.min " + spiel.name)
            // console.log(spiel)
            return noFilterSelected
        } else {
            return noFilterSelected
                || (filter.dauer[0].active && range.rangeIntersect(duration, filter.dauer[0]))
                || (filter.dauer[1].active && range.rangeIntersect(duration, filter.dauer[1]))
                || (filter.dauer[2].active && range.rangeIntersect(duration, filter.dauer[2]))
                || (filter.dauer[3].active && range.rangeIntersect(duration, filter.dauer[3]))

        }
        // ||
        // (filter.dauer[1].active && spiel.dauer.min >= 30 && spiel) ||
        // (filter.dauer[2].active && spiel.dauer.max < 30)

        // return spiel.duration.max > 60
    });
    renderedGames.length = 0
    for (let i = 0; i < 9; i++) {
        renderedGames.push(afterFilter[i])
    }
    return afterFilter;
})
console.log(filteredGames.size)

export {filter, renderedGames, filteredGames}
