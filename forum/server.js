const express = require('express')
const app = express()
const { MongoClient, ObjectId } = require('mongodb');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))



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
    //응답.send(res[0].title)

    응답.render('list.ejs', { posts: res })
})

app.get('/time', async (요청, 응답) => {
    응답.render('time.ejs', { data: new Date() })
})

app.get('/write', (요청, 응답) => {
    응답.render('write.ejs')
})

app.post('/add', async (요청, 응답) => {
    console.log(요청.body);

    try {
        if (요청.body.title == '') {
            응답.send('제목 입력 안함')
        } else {
            await db.collection('post2').insertOne({title: 요청.body.title, content: 요청.body.content},)
            응답.redirect('/list')
        }
    } catch (error) {
        console.log(error);
        응답.status(500).send('서버 에러')
    }

})

app.get('/detail/:id', async (요청, 응답)=>{
    try {
        let result = await db.collection('post2').findOne({ _id : new ObjectId(요청.params.id) })
        console.log("result는", 요청.params);
        if (result == null) {
            응답.status(404).send('존재하지 않는 url 입력함')
        }
        응답.render('detail.ejs', { result: result })
    } catch (error) {
        console.log(error)
        응답.status(404).send('존재하지 않는 url 입력함')
    }
})

app.get('/edit/:id', async (요청, 응답) => {
    //await db.collection('post2').updateOne({ _id: new ObjectId(요청.params.id) }, {$set: { title: 요청.body.title, content: 요청.body.contnet }})
    let result = await db.collection('post2').findOne({ _id: new ObjectId(요청.params.id) })
    console.log(result)
    응답.render('edit.ejs', { result: result })
})

app.put('/edit', async (요청, 응답) => {
    await db.collection('post2').updateOne({ _id : 1 }, {$inc : { like : -2}})

    // let result = await db.collection('post2').updateOne({ _id: new ObjectId(요청.body.id) }, {$set: { title: 요청.body.title, content: 요청.body.content }})
    
    // console.log(result);
    // 응답.redirect('/list')
})