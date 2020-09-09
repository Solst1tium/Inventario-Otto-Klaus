<template>
  <div class="container"> 
    <v-form ref="form">
      <v-text-field v-model="currentToy.data.code"  label="Codigo" required></v-text-field>   
      <v-text-field v-model="currentToy.data.name" label="Nombre juguete" required> </v-text-field>
      <v-text-field v-model="currentToy.data.stock" label="Stock" required></v-text-field>
      <v-text-field v-model="currentToy.data.price" label="Precio" required></v-text-field>
      <v-btn @click="submitForm"  color="success" class="mr-4"> {{currentToy.id ? "Actualizar" : "Crear"}}</v-btn>
      <v-btn @click="cleanCurrentToy" color="error" class="mr-4">Cancelar</v-btn>    
  </v-form>

  <v-container grid-list-xs>
    <input class="input" type="text" placeholder="producto a buscar" v-model="search">
  </v-container>
  <v-divider></v-divider>

  <v-simple-table dark fixed-header class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Stock</th>
          <th class="text-left">Precio</th>  
          <th class="text-left"></th>    
          <th class="text-left"></th>             
        </tr>
      </thead>
      <tbody>
        <tr v-for="toy in filterList" :key="toy.id">
          <td>{{ toy.data.code }}</td>
          <td>{{ toy.data.name }}</td>
          <td>{{ toy.data.stock }}</td>
          <td>{{ toy.data.price }}</td>
          <td><v-icon @click="editToy(toy)" color="yellow accent-4">mdi-pencil-outline</v-icon></td>
          <td><v-icon @click="removeToy(toy.id)">mdi-delete</v-icon></td>
         
      
        </tr>
      </tbody>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
          stock: 0,
          price: 0          
        }
      },
      search:''
    }
  },

  computed: {
    ...mapState(['toys', 'overlay']),
    filterList(){
      return this.toys.filter((toy) =>{
        return toy.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }

  },

  methods: {
    ...mapActions(['setToys', 'submitToy','updateToy', 'deleteToy']),

    submitForm(){
      if(!this.currentToy.id){//si no tiene id crear un juguete nuevo
          this.createToy()
      }else{//si no, actualizar
          this.update(this.currentToy)
      }
    },
    update(){
      this.updateToy(this.currentToy)
      this.cleanCurrentToy()
    },
    removeToy(id){
      let confirmation = confirm("tay seguo choro manolo?")
      if(confirmation){
        this.deleteToy(id),
        this.cleanCurrentToy()
      }     
    },
    createToy(){
      const toy = this.currentToy.data  
      this.submitToy(toy)
      this.cleanCurrentToy()
      },

      setCurrentToy(toy){
          this.currentToy = toy
      },
      editToy(toy){
       this.currentToy.data.code = toy.data.code,
        this.currentToy.data.name = toy.data.name,
        this.currentToy.data.stock = toy.data.stock,
        this.currentToy.data.price = toy.data.price,
        this.currentToy.id = toy.id
      },

      cleanCurrentToy() {
        this.currentToy.data.code = '',
        this.currentToy.data.name = '',
        this.currentToy.data.stock = 0,
        this.currentToy.data.price = 0,
        this.currentToy.id = undefined        
    }      
  },
  created() {
    this.setToys()    
  },  
}
</script>