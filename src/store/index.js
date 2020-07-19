import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        items:JSON.parse(localStorage.getItem('items') || '[]')
    },
    mutations:{
        setItems(state,data) {
            state.items = data;
            localStorage.setItem('items',JSON.stringify(data))
        }
    },
    actions:{

    },
    getters:{

    }
})
