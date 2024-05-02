<template>
    <h1>Login</h1>

    <input type="text" v-model="email" placeholder="Type your email...">
    <input type="password" @keyup.enter="handleLogin" v-model="password" placeholder="Type your password...">

    <p>Don't have an account yet? 
        <router-link to="/signup">Register here</router-link>
    </p>

    <button @click="handleLogin" type="button" class="btn btn-primary">Login</button>
</template>

<script>
    import axios from 'axios'
    import { useToast } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    export default {
        name: 'LoginPage',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async handleLogin() {
                try {
                    let result = await axios.get('http://localhost:3000/users', {
                        params: {
                            email: this.email,
                            password: this.password
                        }
                    });

                    // Login bem-sucedido
                    if (result.status === 200 && result.data.length > 0) {
                        useToast().success('Login successful!', 
                            { duration: 3000, position: 'top-right' });
                        
                        localStorage.setItem('user-info', JSON.stringify(result.data[0]));
                        this.$router.push('/home');
                    } else {
                        useToast().error('Incorrect email or password!', 
                            { duration: 3000, position: 'top-right' });
                    }
                } catch (error) {
                    useToast().warning('Email ou senha errados!', 
                        { duration: 3000, position: 'top-right' });
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