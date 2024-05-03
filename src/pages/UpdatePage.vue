<template>
    <div class="restaurants">
        <h3>Restaurants List:</h3>
        <RestaurantsTable />
    </div>
</template>

<script>
    import RestaurantsTable from '../components/restaurantsTable.vue'

    export default {
        name: 'UpdatePage',
        components: {
            RestaurantsTable,
        },
    }
</script>