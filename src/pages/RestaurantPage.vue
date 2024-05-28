<script setup>
    import RestaurantCard from '@/components/RestaurantCard.vue';
    import axios from 'axios';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useToast } from 'vue-toast-notification';
    import ReviewComment from '@/components/ReviewComment.vue';
    import '../styles/RestaurantPage.scss'
    import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue';

    const route = useRoute();
    const restaurant = ref(null);
    const comments = ref([]);
    const toast = useToast();
    const numberOfComments = 3;

    const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

    const fetchRestaurant = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/restaurants/${route.params.id}`);
            restaurant.value = response.data;
        } catch (error) {
            console.error(error);
            toast.error('Error fetching restaurant!', { duration: 3000, position: 'top-right' });
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/comments`);
            comments.value = response.data[0];
            console.log(comments.value);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching comments!', { duration: 3000, position: 'top-right' });
        }
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        
        return array;
    };

    const selectRandomComments = (comments) => {
        const shuffledComments = shuffleArray(comments);
        return shuffledComments.slice(0, numberOfComments);
    };

    const removeBlankSpaces = (string) => string.replace(/\s/g, '');
    const selectedComments = computed(() => selectRandomComments(comments.value));

    onMounted(() => {
        fetchRestaurant();
        fetchComments();
    });
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

    <div class="rest-banner mt-3" v-show="restaurant">
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
                            @{{ removeBlankSpaces(restaurant.name) }} 
                        </a>
    
                        <a href="#"> 
                            <span class="pi pi-whatsapp"></span>
                            {{ removeBlankSpaces(restaurant.contact) }} 
                        </a>
    
                        <a href="#">  
                            <span class="pi pi-facebook"></span>
                            /{{ removeBlankSpaces(restaurant.name) }}
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

    <div class="suggestions row pb-3 w-100" v-show="restaurant">
        <div class="col-4">
            <ScrollAreaRoot
                class="ScrollAreaRoot card"
                style="--scrollbar-size: 10px"
            >
                <ScrollAreaViewport class="ScrollAreaViewport">
                    <div :style="{ padding: '15px 20px' }">
                        <div class="Text">
                            Full Menu
                        </div>

                        <div
                            v-for="tag in tags"
                            :key="tag"
                            class="Tag"
                        >
                            <span>{{ tag }}</span>
                            <span>R$10,00</span>
                        </div>
                    </div>
                </ScrollAreaViewport>
                
                <ScrollAreaScrollbar
                    class="ScrollAreaScrollbar"
                    orientation="vertical"
                >
                    <ScrollAreaThumb class="ScrollAreaThumb" />
                </ScrollAreaScrollbar>
                
                <ScrollAreaScrollbar
                    class="ScrollAreaScrollbar"
                    orientation="horizontal"
                >
                    <ScrollAreaThumb class="ScrollAreaThumb" />
                </ScrollAreaScrollbar>
            </ScrollAreaRoot>
        </div>

        <div class="col-8">
            <h2>Reviews:</h2>

            <div v-if="!comments">Carregando comentários...</div>

            <ReviewComment
                v-else
                v-for="(comment) in selectedComments"
                :key="comment.id"
                :img-url="comment.imgUrl"
                :img-alt="comment.imgAlt"
                :text="comment.text"
            />
        </div>  
    </div>
</template>
