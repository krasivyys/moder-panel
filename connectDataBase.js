import mysql from 'mysql2'
import 'dotenv/config'

const connection = mysql.createConnection({
    user: "",
    host: "",
    database: "moderators",
    password: "",
    port: 3306
});
console.log('Connected to DB')


setInterval(async() => {
    connection.query("SELECT * FROM servers WHERE 1", function(err){
        if(err) console.log(err)
    })
}, 3600000)

export default connection
