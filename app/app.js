const express = require('express');
const mysql = require("mysql");
const router = require('./route/v1');
const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'NodeTest'
})

var sql = 'select * from test_table;';
//webフォルダの中身を公開する
app.use(express.static('web'));
app.use('/api/v1', router);
app.get('/api/v1/list', function(req, res){
    connection.query(sql, function(error, results, fields){
        if(error) throw error;
        res.send(results);
    })
})

app.listen(port, function(){
    console.log('Listening on port '+ port +'...');
});
