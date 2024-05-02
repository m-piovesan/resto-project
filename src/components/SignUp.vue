<template>
    <h1>Sign Up</h1>

    <input type="text" v-model="name" placeholder="Type your name...">
    <input type="text" v-model="email" placeholder="Type your email...">
    <input type="password" @keyup.enter="handleSignUp" v-model="password" placeholder="Type your password...">

    <p>Already have an account? 
        <router-link to="/login">Login here</router-link>
    </p>

    <button @click="handleSignUp" type="button" class="btn btn-primary">Sign Up</button>
</template>

<script>
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
                    this.$router.push('/home');
                    localStorage.setItem('user-info', JSON.stringify(result.data));

                    this.name = '';
                    this.email = '';
                    this.password = '';
                }
            }
        },
        mounted() {
            if (localStorage.getItem('user-info')) {
                this.$router.push('/home');
            }
        }
    }
</script>