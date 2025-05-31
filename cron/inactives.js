import connection from "./connectDataBase.js"

function delInactives(){

    connection.query('SELECT * FROM inactives WHERE status=?', ['Активный'], function(err, result){
        if (err) return console.log(err)
        const inactive = result
        for(let i = 0; i < result.length; i++){
            if(new Date() >= new Date(inactive[i].date2 + 'T00:00:00Z')){
                var moder = inactive[i].moder
                connection.query('UPDATE inactives SET status=? WHERE moder=?', ['Истек', moder], function(err){
                    if(err) return console.log(err)
                    connection.query('UPDATE moderators SET neakt=? WHERE user_id=?', ['Нет', moder], function(err){
                        if(err) return console.log(err)
                    })
                })
            }
        }
    })
}


delInactives()