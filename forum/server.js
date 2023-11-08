const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

const { MongoClient } = require('mongodb');

let db
const url = 'mongodb+srv://yunyoung0531:chldbsdud01!@yunyoung0531.5jpytmr.mongodb.net/?retryWrites=true&w=majority';
new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('forum2')
    app.listen(8080, () => {
        console.log('http://localhost:8080 에서 서버 실행 중')
    })
}).catch((err)=>{
    console.log(err)
})



app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})

app.get('/news', (요청, 응답) => {
    // db.collection('post2').insertOne({title : '어쩌구'})
    응답.send('오늘 비옴')
})

app.get('/list', async (요청, 응답) => {
    let res = await db.collection('post2').find().toArray()
    console.log(res[0].title);
    응답.send(res[0].title)
})

app.get('/shop', (요청, 응답) => {
    응답.send('쇼핑 페이지 입니다')
})

app.get('/about', (요청, 응답) => {
    응답.sendFile(__dirname + '/about.html')
})

