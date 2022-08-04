<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { io } from 'socket.io-client';
import { ref } from 'vue';

const socket = io('http://localhost:8080');

const messages = ref([]);

console.log(messages.value);

const input = ref('');

const username = ref('');

const code = ref('');

if (localStorage.messages) {
    messages.value = JSON.parse(localStorage.getItem('messages'));
}

if (localStorage.username) {
    username.value = JSON.parse(localStorage.getItem('username'));
}

socket.on('receive-message', message => {
    messages.value.push(message);
    localStorage.setItem('messages', JSON.stringify(messages.value));
});

function handleSend() {
    console.log(code.value)
    socket.emit('send-message', {name: username.value? username.value : ("User-" + socket.id), message: input.value}, code.value);
    input.value = '';

    localStorage.setItem('username', JSON.stringify(username.value));
}

function updateUser() {
    localStorage.setItem('username', JSON.stringify(username.value));
}

function updateCode() {
    console.log(code.value);
    if(code.value === ''){
        socket.emit('leave-room');
    }
    socket.emit('join-room', code.value);
}

</script>
<template>
    <div class="row">
          <input v-model='username' @change='updateUser' id="inputUsername" type="text" class="dark inputUsername" placeholder="Enter a username">
          <input v-model='code' @change='updateCode' type="text" class="dark inputUsername" placeholder="Enter a secret code">
          <div class="centered">
            <div v-if='messages.length !== 0' class="chat-box">
                <h3 class="centered2">Chat</h3>
                <h5 v-for='message in messages' id="chat-message" class="chat-message purple"><b>{{message.name}}</b>: {{message.message}}</h5>
            </div>
          </div>
          
    </div>
    <div class="row">
        <input v-model='input' id="inputt" type="text" class="dark" placeholder="Enter a message">
        <button @click="handleSend()" id="sendButton" class="send">Send</button>
    </div> 
</template>

<style scoped>
</style>
