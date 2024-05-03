<template>
    <img src="../assets/rest-logo.png">
    <h1 v-if="user">Welcome, {{ user.name }}</h1>
    <h1 v-else>Home Page</h1>

    <div class="restaurants">
        <h3>Restaurants Available:</h3>
        <RestaurantsTable />
    </div>
</template>

<script>
    import '../styles/Home-.scss'
    import RestaurantsTable from '../components/restaurantsTable.vue'

    export default {
        name: 'HomePage',
        components: {
            RestaurantsTable,
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user-info')),
            }
        }
    }
</script>