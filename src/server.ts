import express from 'express'
import path from 'path'
import { app, server } from './lib/http'

import './lib/websocket'

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

/* STATIC PAGES
================ */

app.get('/', (_, response) => {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/chat', (_, response) => {
    response.sendFile(path.join(__dirname, 'chat.html'))
})

server.listen(3000, () => {
    console.log('HTTP server is running on http://localhost:3000')
})