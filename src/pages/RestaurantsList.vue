<script setup> 
    import { useToast } from 'vue-toast-notification';
    import RestaurantCard from '../components/RestaurantCard.vue'
    import 'vue-toast-notification/dist/theme-sugar.css';
    import axios from 'axios';
</script>

<template>
    <RestaurantCard
        v-for="(restaurant) in restaurants"
        :key="restaurant.id"
        :id="restaurant.id"
        :name="restaurant.name"
        :address="`${restaurant.street}, ${restaurant.number}, ${restaurant.neighborhood}, ${restaurant.city} - ${restaurant.state}, ${restaurant.zipCode}`"
        :contact="restaurant.contact"
    />
</template>

<script>
    export default {
        name: 'RestaurantsList',
        data() {
            return {
                restaurants: []
            }
        },
        mounted () {
            try {
                axios.get('http://localhost:3000/restaurants')
                    .then(response => {
                        this.restaurants = response.data;
                    });
            } catch (error) {
                console.error(error);
                useToast().error('Error fetching restaurants!', { duration: 3000, position: 'top-right' });
            }
        }
    }
</script>