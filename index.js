const express = require('express');
const websocket = require('ws');
const http = require('http');

const app = express();
const port = process.env.PORT || 3009;
const server = http.createServer(app);
const wss = new websocket.WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log("connection opened");
    ws.on('message', (message) => {
        console.log("%s: ", message);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === websocket.OPEN) {
                client.send(JSON.stringify(message.utf8));
            }
        });
    });
});


server.listen(port, () => console.log(`listening to port ${port}`));