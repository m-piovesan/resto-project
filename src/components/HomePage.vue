<template>
    <myHeader />
    <div class="home-content">
        <img src="../assets/rest-logo.png">
        <h1 v-if="user">Welcome, {{ user.name }}</h1>
        <h1 v-else>Home Page</h1>
    </div>
</template>

<script>
    import myHeader from './Header-.vue';
    import '../styles/HomePage.scss'

    export default {
        name: 'HomePage',
        components: {
            myHeader,
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user-info'))
            }
        },
        mounted() {
            if (!localStorage.getItem('user-info')) {
                this.$router.push('/signup');
            }
        }
    }
</script>