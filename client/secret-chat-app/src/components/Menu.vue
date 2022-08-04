<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue'; 


const inputName = ref('');

function handleName() {
    if(inputName.value) {
        console.log("Attempting to connect to: " + inputPassword.value)
    } 
    else{
        console.log("nothing to connect to");
    }
}


</script>

<template>
    <div class="container grid">
        <input v-model="inputPassword" id="inputPassword" class ="input-text" placeholder="Please Enter the Password">
        <button @click="handleConnect()">Connect</button>
    </div>
    
</template>

<style scoped>

</style>
