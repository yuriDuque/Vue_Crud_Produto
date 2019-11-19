import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [{ id: 1, nome: "Bola", valor: "R$ 50,00" }],
        produto: {
            id: null,
            nome: "",
            valor: null
        }
    },

    getters: {
        getAll(state) {
            return state.data;
        },

        getProdutoSelected(state) {
            return state.produto;
        }
    },

    mutations: {
        increment(state, produto) {
            var id = 1;
            state.data.forEach(element => {
                if (element.id >= id) {
                    id = element.id + 1
                }
            });

            produto.id = id;
            state.data.push(produto);
        },

        decrement(state, id) {
            state.data = state.data.filter(produto => produto.id != id);
        },

        edit(state, p) {
            var index = state.data.findIndex(produto => produto.id == p.id);
            state.data[index] = p;
        },

        produtoSelected(state, id) {
            var produto = state.data.filter(p => p.id == id);

            if (produto.length) {
                state.produto = produto.shift()
            }
        },

        resetProduto(state) {
            state.produto = {
                id: null,
                nome: "",
                valor: null
            }
        }
    }
})