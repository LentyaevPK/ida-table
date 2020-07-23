import Vue from "vue";
import Vuex from "vuex";
import { getProducts, deleteProducts } from "../request";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        fetchProductsError: false,
    },
    mutations: {
        get_products(state, products) {
            state.products = products;
        },
        fetch_error(state) {
            state.fetchProductsError = true;
        },
        remove_products(state, products) {
            products.forEach((product) => {
                const index = state.products.findIndex(
                    (item) => item === product
                );
                state.products.splice(index, 1);
            });
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            try {
                let response = await getProducts();
                commit("get_products", response);
            } catch (e) {
                console.error(e.error);
                commit("fetch_error");
            }
        },
        async fetchDelete({ commit }, products) {
            let response = await deleteProducts();
            if (response.message) {
                commit("remove_products", products);
            }
        },
    },
    modules: {},
});
