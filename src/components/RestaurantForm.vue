<template>
    <form on-submit="$emit('handleSubmit')" action="">

    </form>

    <label for="name">Name:
        <input v-model="name" type="text" id="name" required>
    </label>

    <label for="cep">CEP:
        <input v-model="address.cep" @blur="searchZipCode(address.cep)" type="text" id="cep" minlength="9" maxlength="9" required/>
    </label>
    
    <label for="rua">Street:
        <input v-model="address.street" type="text" id="rua" required/>
    </label>

    <div class="row">
        <label class="col-9" for="bairro">Neighborhood:
            <input v-model="address.neighborhood" type="text" id="bairro" required/>
        </label>
    
        <label class="col-3" for="number">Number:
            <input v-model="address.number" type="text" id="number" required>
        </label>
    </div>

    <div class="row">
        <label class="col-9" for="cidade">City:
            <input v-model="address.city" type="text" id="cidade" required/>
        </label>

        <label class="col-3" for="uf">State:
            <input v-model="address.state" type="text" id="uf" required/>
        </label>
    </div>
    
    <label for="number">Contact:
        <input v-model="contact" type="text" id="contact" required>
    </label>
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
                }
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
                    this.address.street = content.logradouro;
                    this.address.neighborhood = content.bairro;
                    this.address.city = content.localidade;
                    this.address.state = content.uf;
                    this.address.cep = content.cep;
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
        
                    const script = document.createElement('script');
                    script.src = `https://viacep.com.br/ws/${zip}/json/?callback=my_callback`;
                    document.body.appendChild(script); 
            
                    window.my_callback = this.myCallback;
                } else {
                    this.clearAddressForm();
                    alert('Invalid zip code format.');
                }
            }
        }
    }
</script>