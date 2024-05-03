<template>
    <div>
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
                    <td class="d-flex justify-content-center gap-4" v-if="isUpdateRoute">
                        <span @click="editRestaurant" class="pi pi-pencil"></span>
                        <span class="pi pi-trash"></span>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Formulário de edição (será exibido ao clicar em "Editar") -->
        <div v-if="showEditForm">
            <h2>Edit Restaurant</h2>
            <input type="text" v-model="editedRestaurant.name" placeholder="Restaurant's name...">
            <input type="text" v-model="editedRestaurant.contact" placeholder="Restaurant's contact...">
            <input type="text" v-model="editedRestaurant.address" placeholder="Restaurant's address...">
            <button @click="saveRestaurant">Save</button>
            <button @click="cancelEdit">Cancel</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
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
                showEditForm: false
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
            editRestaurant(restaurant) {
                // Preencher o formulário de edição com os valores do restaurante selecionado
                this.editedRestaurant.id = restaurant.id;
                this.editedRestaurant.name = restaurant.name;
                this.editedRestaurant.contact = restaurant.contact;
                this.editedRestaurant.address = restaurant.address;
                
                // Mostrar o formulário de edição
                this.showEditForm = true;
            },
            async saveRestaurant() {
                try {
                    // Enviar uma solicitação PUT para atualizar o restaurante
                    await axios.put(`http://localhost:3000/restaurants/${this.editedRestaurant.id}`, {
                        name: this.editedRestaurant.name,
                        contact: this.editedRestaurant.contact,
                        address: this.editedRestaurant.address
                    });
                    
                    // Atualizar a lista de restaurantes
                    let response = await axios.get('http://localhost:3000/restaurants');
                    this.restaurants = response.data;
                    
                    // Ocultar o formulário de edição
                    this.showEditForm = false;
                } catch (error) {
                    console.error(error);
                }
            },
            cancelEdit() {
                // Limpar o objeto de restaurante editado e ocultar o formulário de edição
                this.editedRestaurant = {
                    id: null,
                    name: '',
                    contact: '',
                    address: ''
                };
                this.showEditForm = false;
            }
        }
    }
</script>