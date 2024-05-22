<script setup>
import RestaurantCard from '@/components/RestaurantCard.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

// Obtenha a rota atual para acessar os parâmetros da rota
const route = useRoute();

// Inicialize o estado para armazenar os dados do restaurante
const restaurant = ref(null);

// Função para buscar os dados do restaurante baseado no ID da rota
const fetchRestaurant = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/restaurants/${route.params.id}`);
        restaurant.value = response.data;
    } catch (error) {
        console.error(error);
        useToast().error('Error fetching restaurant!', { duration: 3000, position: 'top-right' });
    }
};

// Chame a função fetchRestaurant quando o componente for montado
onMounted(fetchRestaurant);
</script>

<template>
    <RestaurantCard 
        v-if="restaurant"
        :name="restaurant.name"
        :address="`${restaurant.street}, ${restaurant.number}, ${restaurant.neighborhood}, ${restaurant.city} - ${restaurant.state}, ${restaurant.zipCode}`"
        :contact="restaurant.contact"
        :id="restaurant.id"
    />

    <p v-else>Loading...</p>

    <div class="rest-banner mt-3 bg-danger">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sollicitudin convallis lacus, vitae posuere sapien vehicula vel. Vivamus ultricies eget lectus ultricies posuere. Nullam augue odio, bibendum sit amet aliquet nec, pretium at diam. Aliquam ac molestie diam, et auctor tellus. Suspendisse potenti. Proin eu purus id arcu dignissim consequat. Suspendisse potenti. Pellentesque rutrum arcu sit amet mauris pulvinar, non molestie metus malesuada. Aenean semper a mi sit amet porta. Nulla facilisi. Vestibulum pharetra ornare magna. In hac habitasse platea dictumst. Vivamus vitae ultrices elit, in molestie quam.</p>
    </div>
</template>
