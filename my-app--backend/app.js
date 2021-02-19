const mysql = require('mysql')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var jsonParser = bodyParser.json()






const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sampleDB'
})


connection.connect((err) =>{
    if(err){
        throw err;
    }
    console.log("database is connected!!!!");

})


    

// app.get('/create-table', (req,res) =>{
//     const sql = `CREATE TABLE Persons(id int AUTO_INCREMENT, StateIssuedDivorceId int, Name varchar(255), Nationality varchar(255),DOB DATE,MaritalStatus varchar(255), HighestEducation varchar(255),  primary key (id));`
//     connection.query(sql,(err, result) => {
//         if(err) throw err;
//         console.log(result)
//         res.send("table created")
//     })
// })

app.post('/create',  (req,res) =>{
    console.log("req", req.body)
    const sql = `INSERT INTO Persons (Name, StateIssuedDivorceId) VALUES ("${req.body.Name}", "${+req.body.StateIssuedDivorceId}")`;
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        console.log("result", result.insertId)
        res.send(result)
    })
})


app.get('/get-data/:id', (req,res) =>{
    console.log("ree",req.params.id)
    const sql = `select * from Persons where id = ${+req.params.id}`
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(result[0])
    })
})

app.get('/get-data', (req,res) => {
    const sql = `select * from Persons order by id DESC`;
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(result)
    })
})





app.post('/update/:id', (req,res) =>{
    let sql = '';
    console.log("req",req.body)
    console.log("req.params.id",req.params.id)
    if(req.body.step === '1'){
        sql =  `UPDATE Persons SET Name = "${req.body.Name}", StateIssuedDivorceId = "${req.body.divoreceId}" where id= "${+req.params.id}"`
    }else if(req.body.step === '2'){
        sql =  `UPDATE Persons SET DOB = "${req.body.DOB}", Nationality = "${req.body.Nationality}"  where id= "${+req.params.id}"`
    }else if(req.body.step === '3'){
        sql =  `UPDATE Persons SET MaritalStatus = "${req.body.MaritalStatus}", HighestEducation = "${req.body.HighestEducation}" where id=${+req.params.id}`
    }
  
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        console.log(result)
        res.send(result)
    })
})

app.use('*', (req, res) => res.status(404).send({ result: 'api route not found' }));

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server started on port ${port} `))