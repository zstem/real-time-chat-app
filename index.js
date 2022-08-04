const express = require('express');

const http = require('http');

const cors = require('cors');

const app = express();

const server = http.createServer(app);


const io = require('socket.io')(server, {
    cors: {
        origin: ['https://real-time-chat-app-zstem.netlify.app/'],
    },
});

app.use(cors({ origin: 'https://real-time-chat-app-zstem.netlify.app/', credentials: true }))

const port = process.env.PORT || 3000;



io.on('connection', (socket) => {
    console.log('user ' + socket.id +' connected.');
    
    socket.on('send-message', (message, room) => {
        if(room === ''){
            io.emit('receive-message', message);
        }else{
            io.to(room).emit('receive-message', message);
        }
      });

      socket.on('join-room', (room) => {
        socket.on('leave-room', () => {
            socket.leave(room);
          });
        socket.join(room);
      });
  });

app.get('/', (req, res) => {
    res.send('Successful response to GET.');
  });

app.post('/', (req, res) => {
    res.send('Successful response to POST.');
});

app.listen(port, () => console.log('App is listening on port ' + port));