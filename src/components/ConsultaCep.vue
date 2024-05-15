<template>
    <div>
      <!-- Form for input data -->
      <form @submit.prevent>
        <label for="cep">CEP:
          <!-- Input field for zip code -->
          <input v-model="cep" @blur="searchZipCode" type="text" id="cep" maxlength="9"/>
        </label><br/>
        <label for="rua">Street:
          <!-- Input field for street -->
          <input v-model="address.street" type="text" id="rua"/>
        </label><br/>
        <label for="bairro">Neighborhood:
          <!-- Input field for neighborhood -->
          <input v-model="address.neighborhood" type="text" id="bairro"/>
        </label><br/>
        <label for="cidade">City:
          <!-- Input field for city -->
          <input v-model="address.city" type="text" id="cidade"/>
        </label><br/>
        <label for="uf">State:
          <!-- Input field for state -->
          <input v-model="address.state" type="text" id="uf"/>
        </label><br/>
      </form>
    </div>
  </template>
  
<script>
    export default {
        data() {
            return {
                cep: '', // Variable to store the zip code entered by the user
                address: { // Object to store address data
                    street: '',
                    neighborhood: '',
                    city: '',
                    state: ''
                }
            };
        }
    };
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