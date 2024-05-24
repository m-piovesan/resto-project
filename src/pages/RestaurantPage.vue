<script setup>
    import RestaurantCard from '@/components/RestaurantCard.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toast-notification';
    import '../styles/RestaurantPage.scss'

    const route = useRoute();
    const restaurant = ref(null);
    const toast = useToast();

    const fetchRestaurant = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurants/${route.params.id}`);
            restaurant.value = response.data;
        } catch (error) {
            console.error(error);
            toast.error('Error fetching restaurant!', { duration: 3000, position: 'top-right' });
        }
    };

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

    <div class="rest-banner mt-3">
        <div class="container">
            <div class="rest-banner_content w-100 row">
                <div class="col-3">
                    <h2>Happenings:</h2>
                    <p>Stay tuned to our website and social media for the latest happenings and exclusive events at The OG, the heart of Denver's dynamic brunch and dining scene. Indulge in our themed brunches, relish our monthly specials, and join us in giving back to the community. There’s always something new and exciting to look forward to.</p>
                    <p>Don’t miss out – book your table today and follow us on Instagram for daily inspirations and surprises!</p>
                </div>
    
                <div class="col-4 rest-banner_social" v-if="restaurant">
                    <h2>Follow us:</h2>

                    <div>
                        <a href="#">
                            <span class="pi pi-instagram"></span>
                            @{{ restaurant.name }} 
                        </a>
    
                        <a href="#"> 
                            <span class="pi pi-whatsapp"></span>
                            {{ restaurant.contact }} 
                        </a>
    
                        <a href="#">  
                            <span class="pi pi-facebook"></span>
                            /{{ restaurant.name }}
                        </a>
                    </div>
                </div>
                
                <div id="carouselExampleInterval" class="carousel slide col-5" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="5000">
                            <img src="../assets/expresso.jpg">
                        </div>
    
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="../assets/rest2.jpg">
                        </div>
                        
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="../assets/rest1.jpg">
                        </div>
                    </div>
    
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
    
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="suggestions row">
        <div class="col-4">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum repellat saepe, hic molestias quae quidem suscipit asperiores accusamus optio consequuntur vitae eligendi excepturi, doloribus quam, voluptas ipsum natus sapiente ex.</p>
        </div>

        <div class="col-4">
            <h2>uepa</h2>
        </div>

        <div class="col-4">
            <h2>uepa</h2>
        </div>
    </div>
</template>
