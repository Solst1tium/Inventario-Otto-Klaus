<template>
  <div class="container"> 
    <v-form ref="form">
      <v-text-field v-model="currentToy.data.code"  label="Codigo" required></v-text-field>   
      <v-text-field v-model="currentToy.data.name" label="Nombre juguete" required> </v-text-field>
      <v-text-field v-model="currentToy.data.stock" label="Stock" required></v-text-field>
      <v-text-field v-model="currentToy.data.price" label="Precio" required></v-text-field>
      <v-btn  color="success" class="mr-4"> {{currentToy.id ? "Editar" : "Crear"}}</v-btn>
      <v-btn color="error" class="mr-4">Cancelar</v-btn>    
  </v-form>
  <v-divider></v-divider>

  <v-simple-table dark fixed-header class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Stock</th>
           <th class="text-left">Precio</th>           
        </tr>
      </thead>
      <tbody>
        <tr v-for="toy in toys" :key="toy.id">
          <td>{{ toy.data.name }}</td>
          <td>{{ toy.data.price }}</td>
          <td>{{ toy.data.stock }}</td>
          <td>{{ toy.data.code }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {      
      currentToy: {
        id: undefined,
          data: {
          code:'',
          name:'',
          price: 0,
          stock: 0
        }
      }
    }
  },
  computed: {
    ...mapState(['toys'])
  },
  methods: {
    ...mapActions(['setToys']),
    createToy(){
        const toy = {
        code: this.currentToy.data.code,
        name: this.currentToy.data.name,
        price: this.currentToy.data.price,
        stock: this.currentToy.data.stock
      }
      this.submitToy(toy)
      this.cleanCurrentToy
      },
      cleanCurrentToy() {
        this.currentToy.data.code = '',
        this.currentToy.data.name = '',
        this.currentToy.data.price = 0,
        this.currentToy.data.stock = 0
    }
      
  },
  created() {
    this.setToys()    
  },
  
}
</script>