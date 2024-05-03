<template>
    <h1>Add a restaurant:</h1>

    <input type="text" v-model="name" placeholder="Restaurant's name...">
    <input type="text" v-model="contact" placeholder="Restaurant's contact...">
    <input type="text" v-model="address" placeholder="Restaurant's address...">

    <button @click="handleAddRestaurant" type="button" class="btn btn-primary">Add Restaurant</button>
</template>

<script>
    import axios from 'axios'
    import '../styles/AddPage.scss'
    import { useToast } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    export default {
        name: 'HomePage',
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