<template>
    <div class="updateContainer">
        <div class="addRestaurant">
            <h3>Add a restaurant:</h3>
            <p>Wanna add a new restaurant to the list? Do it easily right here!</p>
            
            <div class="formsField">
                <input type="text" v-model="name" placeholder="Restaurant's name...">
                <input type="text" v-model="contact" placeholder="Restaurant's contact...">
                <input type="text" v-model="address" placeholder="Restaurant's address...">
            </div>
            
            <button @click="handleAddRestaurant" type="button" class="btn btn-primary">Add Restaurant</button>
        </div>
        
        <div class="restaurantsList">
            <h3>Restaurants List:</h3>
            <RestaurantsTable />
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import { useToast } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    import RestaurantsTable from '../components/restaurantsTable.vue'
    import '../styles/UpdatePage.scss'

    export default {
        name: 'UpdatePage',
        components: {
            RestaurantsTable,
        },
        data() {
            return {
                name: '',
                contact: '',
                address: ''
            }
        },
        methods: {
            async handleAddRestaurant() {
                let result = await axios.post('http://localhost:3000/restaurants', {
                    name: this.name,
                    contact: this.contact,
                    address: this.address
                });

                if (result.status === 201) {
                    this.$router.push('/home');
                    useToast().success('Restaurant added!', 
                        { duration: 3000, position: 'top-right' });
                }
            }
        },
    }
</script>

<style scoped>
    input {
        width: 400px;
        height: 40px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>