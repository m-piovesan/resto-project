<template>
    <div class="container">
        <img src="../assets/rest-logo.png">
        <h1>Welcome, {{ user.name }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user-info'))
            }
        }
    }
</script>