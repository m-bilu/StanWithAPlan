class WeekSched {
    constructor() {
        this.week = Array(7);
        for (let i = 0; i <= 6; ++i) {
            this.week[i]=[]
        }

        // Is empty calendar
        // For testing, lets manually add some events of interest
        // Allowed to have overlapping events


        // Adding Monday, 11am to 1pm, breakdancing
        this.week[0].push({user: 'Bilal', startHour : 11, startMinute : 0, endHour : 13, endMinute : 0, desc : 'Break Dancing.'})

        // Adding Monday, 2pm to 5pm, lollygaggin
        this.week[0].push({user: 'Billu', startHour : 14, startMinute : 0, endHour : 17, endMinute : 0, desc : 'Lolly Gaggin.'})



    }

    sched(day) { // Day is integer from 0 to 6
        let res = '';
        let oldStart = -1;
        let first = true;
        for (const event of this.week[day]) {

            if (event.startHour != oldStart && first == false) {res = res + "\n";}

            let eventStr = `| ${event.startHour}:${event.startMinute} -- ${event.user}: ${event.desc} -- ${event.endHour}:${event.endMinute} | `

            res = res + eventStr;

            oldStart = event.startHour;

            first = false;
        }

        if (res == '') {res = '--/--';}

        console.log(res);
        return res;

    }
}

let week = new WeekSched();

module.exports = { week };