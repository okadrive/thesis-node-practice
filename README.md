# node.js + Expressの素振り

素振りしていきます．
## mysqlの設定
### ユーザ
- ユーザ名: root
- パスワード: root
- データベース: NodeTest 
### テーブル
- db/test_table.sqlに記載

## 実行方法

```shell
$ nodemon app/app.js
```
1. localhost: 3000にブラウザからアクセス
2. テキストボックスに適当な名前を入れてaddボタンをクリック
3. 追加した名前が表示される
4. localhost: 3000/api/v1/listにアクセスしてaddしたデータがあれば成功
- <font color=#ff0000>deleteボタンは今のところ使えません</font>