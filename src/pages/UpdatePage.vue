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
    
                        <form class="address-form" @submit.prevent>
                            <label for="name">Name:
                                <input v-model="name" type="text" id="name" class="form-control" required>
                            </label>

                            <label for="cep">CEP:
                                <input v-model="address.cep" @blur="searchZipCode" type="text" id="cep" maxlength="9"/>
                            </label>
                            
                            <label for="rua">Street:
                                <input v-model="address.street" type="text" id="rua"/>
                            </label>

                            <div class="row">
                                <label class="col-9" for="bairro">Neighborhood:
                                    <input v-model="address.neighborhood" type="text" id="bairro"/>
                                </label>
                            
                                <label class="col-3" for="number">Number:
                                    <input v-model="address.number" type="text" id="number" class="form-control" required>
                                </label>
                            </div>

                            <div class="row">
                                <label class="col-9" for="cidade">City:
                                    <input v-model="address.city" type="text" id="cidade"/>
                                </label>
    
                                <label class="col-3" for="uf">State:
                                    <input v-model="address.state" type="text" id="uf"/>
                                </label>
                            </div>
                            
                            <label for="number">Contact:
                                <input v-model="contact" type="text" id="contact" class="form-control" required>
                            </label>

                            <div class="d-flex justify-content-around mt-4">
                                <DialogClose type="submit" class="btn btn-success w-25" @click="handleAddRestaurant">Save</DialogClose>
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
            async handleAddRestaurant() {
                let result = await axios.post('http://localhost:3000/restaurants', {
                    name: this.name,
                    contact: this.contact,
                    zipCode: this.address.cep,
                    street: this.address.street,
                    neighborhood: this.address.neighborhood,
                    city: this.address.city,
                    state: this.address.state,
                    number: this.address.number,
                });

                if (result.status === 201) {
                    this.$router.push('/update');
                    useToast().success('Restaurant added!', 
                        { duration: 3000, position: 'top-right' });
                }
            },
            clearAddressForm() {
                this.cep = '',
                this.address = {
                    street: '',
                    neighborhood: '',
                    city: '',
                    state: ''
                };
            },
            myCallback(content) {
                if (!('erro' in content)) {
                    this.address = {
                        street: content.logradouro,
                        neighborhood: content.bairro,
                        city: content.localidade,
                        state: content.uf
                    };
                } else {
                    this.clearAddressForm();
                    // alert('Zip code not found.');
                }
            },
            searchZipCode() {
                const cep = this.address.cep.replace(/\D/g, ''); // Remove non-numeric characters from the zip code
                const validZipCode = /^[0-9]{8}$/; // Regular expression to validate the zip code

                if (cep !== '' && validZipCode.test(cep)) {
                    this.address = {
                        street: '...',
                        neighborhood: '...',
                        city: '...',
                        state: '...'
                    };
        
                    const script = document.createElement('script'); // Create a script element to make the request to ViaCEP
                    script.src = `https://viacep.com.br/ws/${cep}/json/?callback=my_callback`; // Set the script URL with the callback
                    document.body.appendChild(script); // Add the script to the document body
            
                    window.my_callback = this.myCallback; // Define the callback method globally
                } else {
                    // If the zip code is invalid, clear the form and show an alert
                    this.clearAddressForm();
                    // alert('Invalid zip code format.');
                }
            }
        },
    }
</script>
