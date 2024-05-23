<template>
    <form @submit.prevent="handleSubmit">
        <label for="name">Name:
            <input
                :value="isEdit ? localRestaurantData.name : name"
                @input="isEdit ? localRestaurantData.name = $event.target.value : name = $event.target.value"
                type="text"
                id="name"
                required
            />
        </label>

        <label for="cep">CEP:
            <input
                :value="isEdit ? localRestaurantData.address.cep : address.cep"
                @input="isEdit ? localRestaurantData.address.cep = $event.target.value : address.cep = $event.target.value"
                @blur="searchZipCode(isEdit ? localRestaurantData.address.cep : address.cep)"
                type="text"
                id="cep"
                minlength="9"
                maxlength="9"
                required
            />
        </label>

        <label for="rua">Street:
            <input
                :value="isEdit ? localRestaurantData.address.street : address.street"
                @input="isEdit ? localRestaurantData.address.street = $event.target.value : address.street = $event.target.value"
                type="text"
                id="rua"
                required
            />
        </label>

        <div class="row">
            <label class="col-9" for="bairro">Neighborhood:
                <input
                    :value="isEdit ? localRestaurantData.address.neighborhood : address.neighborhood"
                    @input="isEdit ? localRestaurantData.address.neighborhood = $event.target.value : address.neighborhood = $event.target.value"
                    type="text"
                    id="bairro"
                    required
                />
            </label>

            <label class="col-3" for="number">Number:
                <input
                    :value="isEdit ? localRestaurantData.address.number : address.number"
                    @input="isEdit ? localRestaurantData.address.number = $event.target.value : address.number = $event.target.value"
                    type="text"
                    id="number"
                    required
                />
            </label>
        </div>

        <div class="row">
            <label class="col-9" for="cidade">City:
                <input
                    :value="isEdit ? localRestaurantData.address.city : address.city"
                    @input="isEdit ? localRestaurantData.address.city = $event.target.value : address.city = $event.target.value"
                    type="text"
                    id="cidade"
                    required
                />
            </label>

            <label class="col-3" for="uf">State:
                <input
                    :value="isEdit ? localRestaurantData.address.state : address.state"
                    @input="isEdit ? localRestaurantData.address.state = $event.target.value : address.state = $event.target.value"
                    type="text"
                    id="uf"
                    required
                />
            </label>
        </div>

        <label for="contact">Contact:
            <input
                :value="isEdit ? localRestaurantData.contact : contact"
                @input="isEdit ? localRestaurantData.contact = $event.target.value : contact = $event.target.value"
                type="text"
                id="contact"
                required
            />
        </label>

        <div class="d-flex justify-content-around mt-4">
            <button
                type="submit"
                class="btn btn-success w-100"
                :disabled="!allFieldsFilled"
            > Save </button>
        </div>
    </form>
</template>


<script>
    import axios from 'axios';
    import '../styles/RestaurantForm.scss';

    export default {
        name: 'RestaurantForm',
        components: {
        },
        data() {
            return {
                restaurants: [],
                name: '',
                contact: '',
                address: {
                    cep: '',
                    street: '',
                    number: '',
                    neighborhood: '',
                    city: '',
                    state: ''
                },
                localRestaurantData: JSON.parse(JSON.stringify(this.restaurantData)) // Clonar o objeto para ser reativo
            }
        },
        props: {
            restaurantData: {
                type: Object,
                default: () => ({
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
                })
            },
            isEdit: Boolean,
        },
        watch: {
            restaurantData: {
                handler(newVal) {
                    this.localRestaurantData = JSON.parse(JSON.stringify(newVal)); // Atualizar o clone sempre que a prop mudar
                },
          
                deep: true
            }
        },
        computed: {
            allFieldsFilled() {
                const fieldsToCheck = [
                    this.isEdit ? this.localRestaurantData.name : this.name,
                    this.isEdit ? this.localRestaurantData.address.cep : this.address.cep,
                    this.isEdit ? this.localRestaurantData.address.street : this.address.street,
                    this.isEdit ? this.localRestaurantData.address.neighborhood : this.address.neighborhood,
                    this.isEdit ? this.localRestaurantData.address.number : this.address.number,
                    this.isEdit ? this.localRestaurantData.address.city : this.address.city,
                    this.isEdit ? this.localRestaurantData.address.state : this.address.state,
                    this.isEdit ? this.localRestaurantData.contact : this.contact
                ];

                return fieldsToCheck.every(field => field.trim() !== '');
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
            clearAddressForm() {
                this.name = '',
                this.contact = '',
                this.address = {
                    cep: '',
                    street: '',
                    number: '',
                    neighborhood: '',
                    city: '',
                    state: '',
                };
            },
            myCallback(content) {
                if (!('erro' in content)) {
                    if (this.isEdit) {
                        this.localRestaurantData.address.street = content.logradouro;
                        this.localRestaurantData.address.neighborhood = content.bairro;
                        this.localRestaurantData.address.city = content.localidade;
                        this.localRestaurantData.address.state = content.uf;
                        this.localRestaurantData.address.cep = content.cep;
                    } else {
                        this.address.street = content.logradouro;
                        this.address.neighborhood = content.bairro;
                        this.address.city = content.localidade;
                        this.address.state = content.uf;
                        this.address.cep = content.cep;
                    }
                } else {
                    this.clearAddressForm();
                    alert('Zip code not found.');
                }
            },
            searchZipCode(cepToSearch) {
                if (!cepToSearch) return;

                const zip = cepToSearch.replace(/\D/g, ''); // Remove non-numeric characters from the zip code
                const validZipCode = /^[0-9]{8}$/; // Regular expression to validate the zip code

                if (validZipCode.test(zip)) {
                    this.address = {
                        street: '...',
                        neighborhood: '...',
                        city: '...',
                        state: '...'
                    };

                    if (this.isEdit) {
                        this.localRestaurantData.address = {
                            street: '...',
                            neighborhood: '...',
                            city: '...',
                            state: '...'
                        };
                    }
        
                    const script = document.createElement('script');
                    script.src = `https://viacep.com.br/ws/${zip}/json/?callback=my_callback`;
                    document.body.appendChild(script); 
            
                    window.my_callback = this.myCallback;
                } else {
                    this.clearAddressForm();
                    alert('Invalid zip code format.');
                }
            },
            handleSubmit() {
                if (this.isEdit) {
                    this.$emit('form-submitted', {
                        name: this.localRestaurantData.name,
                        contact: this.localRestaurantData.contact,
                        address: this.localRestaurantData.address,
                    });
                } else {
                    this.$emit('form-submitted', {
                        name: this.name,
                        contact: this.contact,
                        address: this.address,
                    });
                }

                this.clearAddressForm();
            }
        }
    }
</script>