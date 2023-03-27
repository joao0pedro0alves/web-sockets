import express from 'express'
import path from 'path'
import { app, server } from './lib/http'

import './lib/websocket'

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

server.listen(3000, () => {
    console.log('HTTP server is running on http://localhost:3000')
})