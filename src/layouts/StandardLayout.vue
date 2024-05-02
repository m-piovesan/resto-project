<template>
    <div class="content">
        <img src="../assets/rest-logo.png">

        <router-view />
    </div>
</template>

<script>
    import './StandardLayout.scss';
    
    export default {
        name: 'StandardLayout',
        mounted() {
            if (localStorage.getItem('user-info')) {
                this.$router.push('/home');
            } else {
                this.$router.push('/login');
            }
        }
    }
</script>