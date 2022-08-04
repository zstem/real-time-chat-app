const { application } = require('express');
const express = require('express');

const io = require('socket.io')(8080, {
    cors: {
        origin: ['https://real-time-chat-app-zstem.netlify.app/'],
    },
});

const app = express();

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