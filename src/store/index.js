import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    currentUser: undefined,
    toys: [],
    toy: undefined,
    overlay: false
  },
  mutations: {
    SET_USER(state, user){
      state.currentUser =  user
    },
    SET_TOYS(state, toys){
      state.toys = toys
    },
    SET_TOY(state, toy){
      state.toy = toy
    },
    OVERLAY_TRUE(state){
      state.overlay = true
    },
    OVERLAY_FALSE(state){
      state.overlay = false
    }
  },
  actions: {
    setUser({commit}, user){
      commit('SET_USER', user)
    },
    setToys ({commit}){
      commit('OVERLAY_TRUE')
      axios.get('https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toys').then((response) =>{
        commit('SET_TOYS', response.data)
        commit('OVERLAY_FALSE')
      })
    },
    setToy({commit}, id){//parametros van por url
      axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toys/${id}`).then((response) =>{
        commit('SET_TOY', response.data)
      })
    },
    submitToy({dispatch}, toy){//crear juguete nuevo y ver los juguetes creados
      axios.post('https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toy/', toy).then(() => {
        dispatch('setToys')
      })
    },
    updateToy({dispatch}, toy){
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toy/${toy.id}`, toy.data).then(() => {
        dispatch('setToys')
      })
    },
    deleteToy({dispatch}, id){
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toy/${id}`).then(() =>{
        dispatch('setToys')//actualiza la lista y muestra todos los juguetes
      })
    }
  },
  modules: {
  }
})
