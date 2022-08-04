const express = require('express');



const cors = require('cors');

const app = express();

const server = require('http').Server(app);

app.use(cors({
    //origin: "https://real-time-chat-app-zstem.netlify.app/",
    credentials: true,
  }));


const io = require('socket.io')(server);



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

server.listen(port, () => console.log('App is listening on port ' + port));