import mysql from 'mysql'
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "EmployeeMS"
})

con.connect(function(err){
     if(err)
     {
        console.log("Error connecting to database")
     }
     else
     {
        console.log("Connected to database")
     }
})

export default con;