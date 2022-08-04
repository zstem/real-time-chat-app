const express = require('express');



const cors = require('cors');

const app = express();

const server = require('http').Server(app);

app.use(cors({
    origin: "https://real-time-chat-app-zstem.netlify.app/",
    credentials: true,
  }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//app.use((req, res) => res.sendFile('/index.html', { root: __dirname }))


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