import connection from "./connectDataBase.js"

function AllKpd(){
    const queryKpd = 'INSERT INTO weeklyKpd(user_id, coin, mute, un_mute, prison, un_prison, un_frac, message, server) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'


    connection.query('SELECT * FROM kpd', function(err, result){
        if(err) console.log(err)
    
        const AllKpd = result
        for(let i = 0; i < AllKpd.length; i++){
            connection.query(queryKpd, [AllKpd[i].user_id, AllKpd[i].coin, AllKpd[i].mute, AllKpd[i].un_mute, AllKpd[i].prison, AllKpd[i].un_prison, AllKpd[i].un_frac, AllKpd[i].message, 18])
        }
        return false
    })
    console.log('Успешно!')
    return false
}

AllKpd()


