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
    <div class="updateContainer">
        <DialogRoot>
            <div class="addRestaurant">
                <div class="rest-text">
                    <h3>Add a restaurant:</h3>
                    <p>Wanna add a new restaurant to the list? Do it easily right here!</p>
                </div>
                
                <img src="../assets/rest-logo.png" alt="">
                
                <DialogTrigger class="btn btn-primary pi pi-plus" />
            </div>

            <DialogPortal>
                <DialogOverlay class="inset-0 fixed bg-black/60" />
                <DialogContent class="DialogContent">
                    <DialogTitle class="text-success m-0 fw-medium fs-3 mb-1">Add Restaurant</DialogTitle>
                    
                    <DialogDescription class="DialogDescription">
                        Type the information about the new restaurant. Click save when you're done.
                    </DialogDescription>
    
                    <RestaurantForm @form-submitted="handleAddRestaurant" :is-edit="false" />
                    
                    <DialogClose class="btn btn-danger mt-2">Cancel</DialogClose>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
        
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
    import RestaurantForm from '../components/RestaurantForm.vue'
    import '../styles/UpdatePage.scss'

    export default {
        name: 'UpdatePage',
        components: {
            RestaurantsTable,
            RestaurantForm,
        },
        data() {
            return {
                name: '',
                contact: '',
                address: {
                    cep: '',
                    street: '',
                    number: '',
                    neighborhood: '',
                    city: '',
                    state: ''
                }
            }
        },
        methods: {
            async handleAddRestaurant(newRestaurantData) {
                try {
                    let result = await axios.post('http://localhost:3000/restaurants', {
                        name: newRestaurantData.name,
                        contact: newRestaurantData.contact,
                        zipCode: newRestaurantData.address.cep,
                        street: newRestaurantData.address.street,
                        number: newRestaurantData.address.number,
                        neighborhood: newRestaurantData.address.neighborhood,
                        city: newRestaurantData.address.city,
                        state: newRestaurantData.address.state,
                    });

                    if (result.status === 201) {
                        location.reload(); 
                        useToast().success('Restaurant added!', { duration: 3000, position: 'top-right' });
                    }
                } catch (error) {
                    console.error('Error adding restaurant:', error);
                    useToast().error('Failed to add restaurant. Please try again later.', { duration: 3000, position: 'top-right' });
                }
            }
        },
    }
</script>
