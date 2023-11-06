const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행 중')
})

app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')
})

app.get('/news', (요청, 응답) => {
    응답.send('오늘 비옴')
})

app.get('/shop', (요청, 응답) => {
    응답.send('쇼핑 페이지 입니다')
})

app.get('/about', (요청, 응답) => {
    응답.sendFile(__dirname + '/about.html')
})