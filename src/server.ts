import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

/* STATIC PAGES
================ */

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/chat', (request, response) => {
    response.sendFile(path.join(__dirname, 'chat.html'))
})

app.listen(3000, () => {
    console.log('HTTP server is running on http://localhost:3000')
})