module.exports = {
    getInfo: (req, res) => {
        const db = req.app.get('db');
        db.get_info().then(info => res.status(200).send(info))
    },
    addHours: (req, res) => {
        const db = req.app.get('db');
        const {monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body;
        db.add_hours([monday, tuesday, wednesday, thursday, friday, saturday, sunday]).then(hours => res.status(200).send(hours))
    },
    // getPrevious: (req, res) => {
    //     const db = req.app.get('db');
    //     db.get_previous().then(pinfo => res.status(200).send(pinfo))
    // },

    getPrevious: async (req, res) => {
        const db = req.app.get('db');
        const {days} = req.body;
        let sendDays = [];
        for(let i = 0; i <= 6; i++){
            let newDay = await db.get_previous([days[i]])
            let currentDay = newDay[0]
            if(currentDay){
                currentDay.id = i
                currentDay.date = currentDay.date.toISOString()
                sendDays.push(currentDay)
            } else {
                sendDays.push({
                    id: i,
                    date: days[i],
                    hours: 0,
                    is_closed: false
                })
            }
        }
        res.send(sendDays)
    },
}

