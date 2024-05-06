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
    <DialogRoot>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th v-if="isUpdateRoute" class="text-center">Actions</th> <!-- Adicionando uma coluna para ações, mostrada apenas na rota /update -->
                </tr>
            </thead>

            <tbody>
                <tr v-for="restaurant in restaurants" :key="restaurant.id">
                    <td>{{ restaurant.name }}</td>
                    <td>{{ restaurant.contact }}</td>
                    <td>{{ restaurant.address }}</td>
                    <td class="d-flex justify-content-center gap-4 align-items-center" v-if="isUpdateRoute">
                        <DialogTrigger class="pi pi-pencil" style="color: green" />
                        <span class="pi pi-trash" style="color: darkred"></span>
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
                
                <form @submit.prevent="saveRestaurant">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input v-model="editedRestaurant.name" type="text" id="name" class="form-control" required>
                    </div>

                    <div class="form-group">
                        <label for="contact">Contact:</label>
                        <input v-model="editedRestaurant.contact" type="text" id="contact" class="form-control" required>
                    </div>

                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input v-model="editedRestaurant.address" type="text" id="address" class="form-control" required>
                    </div>

                    <div class="d-flex justify-content-between gap-3">
                        <button type="submit" class="btn btn-success" @click="handleSaveRestaurant">Save</button>
                        <DialogClose @click="cancelEdit" class="btn btn-danger">Cancel</DialogClose>
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
    
    export default {
        name: 'RestaurantsTable',
        data() {
            return {
                restaurants: [],
                editedRestaurant: {
                    id: null,
                    name: '',
                    contact: '',
                    address: ''
                },
            }
        },
        computed: {
            isUpdateRoute() {
                return this.$route.path === '/update';
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
            async handleSaveRestaurant() {
                try {
                    let result = await axios.put(`http://localhost:3000/restaurants/${this.editedRestaurant.id}`, {
                        name: this.editedRestaurant.name,
                        contact: this.editedRestaurant.contact,
                        address: this.editedRestaurant.address
                    });

                    if (result.status === 200) {
                        useToast().success('Restaurant updated!', { duration: 3000, position: 'top-right' });
                    }
                } catch (error) {
                    console.error(error);
                    useToast().error('Error updating restaurant!', { duration: 3000, position: 'top-right' });
                }
            },
            cancelEdit() {
                console.log('cancelEdit');
            }
        }
    }
</script>