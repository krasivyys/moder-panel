import connection from "./connectDataBase.js"
import moment from 'moment'

function weekKpd() {

    const users = 'SELECT user_id FROM kpd'
    const addWeek = 'INSERT INTO weeksKpd(user_id, mute, un_mute, prison, un_prison, un_frac, message, server, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const queryKpd = 'SELECT SUM(mute) as mute, SUM(un_mute) as un_mute, SUM(prison) as prison, SUM(un_prison) as un_prison, SUM(un_frac) as un_frac, SUM(message) AS message, date FROM weeklyKpd WHERE user_id=? GROUP BY WEEK(date)'
    connection.query(users, function(err, result){
        if(err) return console.log(err)
        for(let i = 0; i < result.length; i++){
            var user = result
            connection.query(queryKpd, [user[i].user_id], function(err, result){
                if(err) return console.log(err)
                var info = result[result.length - 1]
                let startWeek = moment(info.date).subtract(1, 'days').startOf('week').add(1, 'days').format("YYYY-MM-DD")
                let endWeek = moment(info.date).subtract(1, 'days').endOf('week').add(1, 'days').format("YYYY-MM-DD")
                connection.query(addWeek, [user[i].user_id, info.mute, info.un_mute, info.prison, info.un_prison, info.un_frac, info.message, 18, `${startWeek} - ${endWeek}`], function(err){
                    if (err) console.log(err)
                })
            })
        }
        console.log('Успешно')
    })
}

weekKpd()