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
    
                        <form @submit.prevent="handleAddRestaurant">
                            <RestaurantForm />

                            <div class="d-flex justify-content-around mt-4">
                                <button type="submit" class="btn btn-success w-25">Save</button>
                                <DialogClose class="btn btn-danger w-25" @click="clearAddressForm">Cancel</DialogClose>
                            </div>
                        </form>
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
        props: {
            newName: String,
            newContact: String,
            newCep: String,
            newStreet: String,
            newNumber: String,
            newNeighborhood: String,
            newCity: String,
            newState: String,
        },
        methods: {
            async handleAddRestaurant() {
                let result = await axios.post('http://localhost:3000/restaurants', {
                    name: this.newName,
                    contact: this.contact,
                    zipCode: this.address.cep,
                    street: this.address.street,
                    neighborhood: this.address.neighborhood,
                    city: this.address.city,
                    state: this.address.state,
                    number: this.address.number,
                });

                if (result.status === 201) {
                    location.reload(); 
                    useToast().success('Restaurant added!', { duration: 3000, position: 'top-right' });
                }
            }
        },
    }
</script>
