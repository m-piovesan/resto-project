<script setup>
    import {
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogOverlay,
        DialogPortal,
        DialogRoot,
        DialogTitle,
        DialogTrigger,
    } from 'radix-vue'
</script>

<template>
    <div class="search">
        <label for="searchInput">Wanna search for a specific restaurant?</label>
        <input type="text" v-model="searchTerm" placeholder="Type its information here!" />
    </div>

    <DialogRoot>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th v-if="isUpdateRoute" class="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="restaurant in filteredRestaurants" :key="restaurant.id">
                    <td>{{ restaurant.name }}</td>
                    <td>{{ restaurant.contact }}</td>
                    <td>{{ restaurant.street }} - {{ restaurant.number }}, {{ restaurant.city }}</td>
                    <td v-if="isUpdateRoute" class="d-flex justify-content-center gap-4 align-items-center">
                        <DialogTrigger class="pi pi-pencil" @click="openEditDialog(restaurant)" style="color: green" />
                        <span class="pi pi-trash" @click="handleDeleteRestaurant(restaurant.id)" style="color: darkred"></span>
                    </td>
                </tr>
            </tbody>
        </table>

        <DialogPortal>
            <DialogOverlay class="inset-0 fixed bg-black/60" />
            
            <DialogContent class="DialogContent">
                <DialogTitle class="text-success m-0 fw-medium fs-3 mb-1">Edit Restaurant</DialogTitle>
                <DialogDescription class="DialogDescription">
                    Edit the information about the restaurant. Click save when you're done.
                </DialogDescription>
                
                <form @submit.prevent="handleSaveRestaurant">
                    <RestaurantForm/>

                    <div class="d-flex justify-content-around mt-4">
                        <DialogClose type="submit" class="btn btn-success w-25" @click="handleSaveRestaurant">Save</DialogClose>
                        <DialogClose class="btn btn-danger w-25">Cancel</DialogClose>
                    </div>
                </form>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script>
    import axios from 'axios';
    import { useToast } from 'vue-toast-notification';
    import '../styles/restaurantsTable.scss';
    import RestaurantForm from './RestaurantForm.vue';
    
    export default {
        name: 'RestaurantsTable',
        components: {
            RestaurantForm,
        },
        data() {
            return {
                restaurants: [],
                searchTerm: '',
                editedRestaurant: {
                    name: '',
                    contact: '',
                    address: {
                        number: '',
                        cep: '',
                        street: '',
                        neighborhood: '',
                        city: '',
                        state: ''
                    }
                },
            }
        },
        computed: {
            isUpdateRoute() {
                return this.$route.path === '/update';
            },
            filteredRestaurants() {
                const searchTerm = this.searchTerm.toLowerCase();
                
                return this.restaurants.filter(restaurant => {
                    const name = (restaurant.name ).toLowerCase();
                    const contact = (restaurant.contact ).toLowerCase();
                    const number = (restaurant.number ).toString();
                    const cep = (restaurant.zipCode).toString();
                    const street = (restaurant.street ).toLowerCase();
                    const neighborhood = (restaurant.neighborhood ).toLowerCase();
                    const city = (restaurant.city).toLowerCase();
                    const state = (restaurant.state ).toLowerCase();

                    return name.includes(searchTerm) ||
                        contact.includes(searchTerm) ||
                        number.includes(searchTerm) ||
                        cep.includes(searchTerm) ||
                        street.includes(searchTerm) ||
                        neighborhood.includes(searchTerm) ||
                        city.includes(searchTerm) ||
                        state.includes(searchTerm);
                });
            }
        },
        async mounted() {
            try {
                let response = await axios.get('http://localhost:3000/restaurants');
                this.restaurants = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        methods: {
            openEditDialog(restaurant) {
                this.editedRestaurant.id = restaurant.id;
                this.editedRestaurant.name = restaurant.name;
                this.editedRestaurant.contact = restaurant.contact;
                // this.editedRestaurant.address = restaurant.address;
            },
            async handleSaveRestaurant() {
                try {
                    let result = await axios.put(`http://localhost:3000/restaurants/${this.editedRestaurant.id}`, {
                        name: this.editedRestaurant.name,
                        contact: this.editedRestaurant.contact,
                        address: this.editedRestaurant.address
                    });

                    if (result.status === 200) {
                        useToast().success('Restaurant updated!', { duration: 3000, position: 'top-right' });
                        let response = await axios.get('http://localhost:3000/restaurants');
                        this.restaurants = response.data;
                    }
                } catch (error) {
                    console.error(error);
                    useToast().error('Error updating restaurant!', { duration: 3000, position: 'top-right' });
                }
            },
            async handleDeleteRestaurant(restaurantId) {
                try {
                    let result = await axios.delete(`http://localhost:3000/restaurants/${restaurantId}`);

                    if (result.status === 200) {
                        useToast().success('Restaurant deleted!', { duration: 3000, position: 'top-right' });
                        this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);
                    }
                } catch (error) {
                    console.error(error);
                    useToast().error('Error deleting restaurant!', { duration: 3000, position: 'top-right' });
                }
            },
        }
    }
</script>