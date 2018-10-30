const express = require('express');
const multer = require('multer'); // multerモジュールを読み込む ファイルのアップロードなしでテキストデータのみの解釈
const uuidv4 = require('uuid/v4'); // uuidモジュールを読み込む

const mysql = require("mysql");
const router = require('./route/v1');
const app = express();

const port = process.env.PORT || 3000;

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'NodeTest'
});

//webフォルダの中身を公開する
app.use(express.static('web'));
app.use(multer().none()); // multerでブラウザから送信されたデータを解釈する
app.use('/api/v1', router);

//contentListデータ
const contentList = [];
connection.query('select * from test_table;', function(error, results){
    if(error) throw error;
    contentList.push(results);
})

//api/v1/listにアクセスした時にcontentリストを返す
app.get('/api/v1/list', function(req, res) {
    //JSONを送信
    connection.query('select * from test_table;', function(error, results){
        if(error) throw error;
        contentList.push(results);
        res.json(results);
    })
});

// http://localhost:3000/api/v1/add にデータを送信してきたときに
// TODOリストに項目を追加する
app.post('/api/v1/add', (req, res) => {
    // クライアントからの送信データを取得する
    const contentData = req.body;
    const contentName = contentData.name;

    // ユニークIDを生成する
    const u_id = uuidv4();

    // TODO項目を作る
    const contentItem = {
        u_id,
        name: contentName,
    };

    // contentリストに項目を追加する
    contentList.push(contentItem);

    //mysqlにデータを追加
    connection.query('insert into test_table(name) values(?);', [contentName],
        function (error) {
            if(error) console.log(error);
        })

    // コンソールに出力する
    console.log('Add: ' + JSON.stringify(contentItem));

    // 追加した項目をクライアントに返す
    res.json(contentItem);
});

// http://localhost:3000/api/v1/item/:id にDELETEで送信してきたときに
// 項目を削除する。:idの部分にはIDが入る
// 例えば
// http://localhost:3000/api/v1/item/cc7cf63c-ccaf-4401-a611-f19daec0f74e
// にDELETEメソッドでアクセスすると、idがcc7cf63c-ccaf-4401-a611-f19daec0f74eのものが削除される

app.delete('api/v1/item/:id', (req, res) => {
    //URLの:idと同じIDを持つ項目を検索
    const index = contentList.findIndex((item) => item.id === req.params.id);

    //項目が見つかった場合
    if(index >= 0){ //該当する要素が1つ以上ある
        const deleted = contentList.splice(index, 1);//indexの位置にある項目を削除
        console.log('Delete: ' + JSON.stringify(deleted[0]));
        connection.query('delete from test_table where id = ?;', [req.params.id],
            function (error) {
                if(error) console.log(error);
            })
    }

    //ステータスコード200:OKを送信
    res.sendStatus(200);
})

app.listen(port, function(){
    console.log('Listening on port '+ port +'...');
});