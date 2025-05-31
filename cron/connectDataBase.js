import mysql from 'mysql2'

const connection = mysql.createConnection({
    user: "",
    host: "",
    database: "moderators",
    password: "",
    port: 3306
});
console.log('Connected to DB')

export default connection
