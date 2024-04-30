<template>
    <div class="container">
        <img src="../assets/rest-logo.png">
        <h1>Sign Up</h1>

        <input type="text" v-model="name" placeholder="Type your name...">
        <input type="text" v-model="email" placeholder="Type your email...">
        <input type="password" v-model="password" placeholder="Type your password...">

        <button @click="handleSignUp" type="button" class="btn btn-primary">Sign Up</button>
    </div>
</template>

<script>
    import '../styles/SignUp.scss'
    import axios from 'axios'

    export default {
        name: 'SignUp',
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            async handleSignUp() {
                let result = await axios.post('http://localhost:3000/users', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });

                if (result.status === 201) {
                    this.$router.push('/');
                    localStorage.setItem('user-info', JSON.stringify(result.data));

                    this.name = '';
                    this.email = '';
                    this.password = '';
                }
            }
        }
    }
</script>