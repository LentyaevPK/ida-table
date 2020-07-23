<template>
    <div class="table">
        <h1 class="table__header">Table UI</h1>
        <hr />
        <div class="table__sort-wrapper">
            <div class="table__sortby-wrapper">
                <span style="padding: 7px 5px">
                    <strong>Sorting By:</strong>
                </span>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'product'}]"
                    @click="moveColumn('product')"
                >Product (100g serving)</div>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'calories'}]"
                    @click="moveColumn('calories')"
                >Calories</div>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'fat'}]"
                    @click="moveColumn('fat')"
                >Fat (g)</div>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'carbs'}]"
                    @click="moveColumn('carbs')"
                >Carbs (g)</div>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'protein'}]"
                    @click="moveColumn('protein')"
                >Protein (g)</div>
                <div
                    :class="['table__sortby-btn', {'table__sortby-btn--active': category === 'iron'}]"
                    @click="moveColumn('iron')"
                >Iron (%)</div>
            </div>
            <div class="table__delete">
                <button
                    :class="['table__delete-btn', {'table-row__btn--green': productsToDelete.length}]"
                    :disabled="!productsToDelete.length"
                    @click="deleteProducts"
                >Delete ({{productsToDelete.length}})</button>
                <div v-if="deleteProductsError" class="table-row__modal table__delete-modal">
                    <span style="margin-bottom: 10px">Failed to delete! Try one more time!</span>
                    <button
                        class="table-row__btn table-row__btn--green"
                        @click="deleteProductsError = false"
                    >Close</button>
                </div>
            </div>
            <select v-model="productsPerPage">
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </select>
            <div class="pagination">
                <button
                    class="pagination-btn"
                    style="transform: rotate(180deg)"
                    @click="showPreviousPage"
                    :disabled="showFrom === 0"
                >></button>
                <span>{{showFrom + 1}}-{{showTo + 1}} of {{products.length}}</span>
                <button
                    class="pagination-btn"
                    @click="showNextPage"
                    :disabled="showTo + 1 === products.length"
                >></button>
            </div>
            <div class="dropdown">
                <input type="checkbox" id="checkbox-toggle" v-model="dropDownMenuOpened" />
                <label
                    class="dropdown__btn"
                    for="checkbox-toggle"
                >{{visibleColumns.length}} columns selected</label>
                <div v-if="dropDownMenuOpened" class="dropdown__menu">
                    <label>
                        <input
                            type="checkbox"
                            value="all"
                            :checked="allColumnsSelected"
                            @change="selectAll"
                        />
                        Select All
                    </label>
                    <label>
                        <input type="checkbox" value="products" v-model="visibleColumns" />
                        Products (100g serving)
                    </label>
                    <label>
                        <input type="checkbox" value="calories" v-model="visibleColumns" />
                        Calories
                    </label>
                    <label>
                        <input type="checkbox" value="fat" v-model="visibleColumns" />
                        Fat (g)
                    </label>
                    <label>
                        <input type="checkbox" value="carbs" v-model="visibleColumns" />
                        Carbs (g)
                    </label>
                    <label>
                        <input type="checkbox" value="protein" v-model="visibleColumns" />
                        Protein (g)
                    </label>
                    <label>
                        <input type="checkbox" value="iron" v-model="visibleColumns" />
                        Iron (%)
                    </label>
                </div>
            </div>
        </div>
        <div class="table__products">
            <TableHeader
                :visibleColumns="visibleColumns"
                :sort="sort"
                :category="category"
                @sortBy="sortBy"
            />
            <hr style="margin: 0" />
            <TableRow
                v-for="product in filterByAmount"
                :key="product.id"
                :product="product"
                :visibleColumns="visibleColumns"
                :category="category"
                :productsToDelete="productsToDelete"
                @removeProduct="removeProduct"
                @removeFromDeleteArray="removeFromDeleteArray"
            />
        </div>
        <p v-if="fetchProductsError" class="error">Не удалось загрузить продукты!</p>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export default {
    name: "Table",
    components: {
        TableRow,
        TableHeader,
    },
    data() {
        return {
            category: "product",
            productsPerPage: "10",
            showFrom: 0,
            showTo: 9,
            sort: {
                category: "",
                sortFromLeast: true,
            },
            dropDownMenuOpened: false,
            visibleColumns: [
                "products",
                "calories",
                "fat",
                "carbs",
                "protein",
                "iron",
            ],
            productsToDelete: [],
            deleteProductsError: false,
        };
    },
    created() {
        this.fetchProducts();
    },
    computed: {
        filterByAmount() {
            return this.products.filter((product, i) => {
                return i >= this.showFrom && i <= this.showTo;
            });
        },
        allColumnsSelected() {
            return this.visibleColumns.length === 6;
        },
        ...mapState(["products", "fetchProductsError"]),
    },
    watch: {
        productsPerPage(newVal, oldVal) {
            if (newVal > oldVal) {
                if (this.showTo + parseInt(newVal) > this.products.length) {
                    this.showFrom -= newVal - oldVal;
                } else {
                    this.showTo += parseInt(newVal) - parseInt(oldVal);
                }
            } else {
                this.showTo -= oldVal - newVal;
            }
        },
    },
    methods: {
        moveColumn(category) {
            this.category = category;
        },
        showNextPage() {
            if (
                this.showTo + parseInt(this.productsPerPage) >
                this.products.length
            ) {
                this.showTo = this.products.length;
                this.showFrom =
                    this.products.length - parseInt(this.productsPerPage);
            } else {
                this.showFrom += parseInt(this.productsPerPage);
                this.showTo += parseInt(this.productsPerPage);
            }
        },
        showPreviousPage() {
            if (this.showFrom - parseInt(this.productsPerPage) < 0) {
                this.showFrom = 0;
                this.showTo = parseInt(this.productsPerPage) - 1;
            } else {
                this.showFrom -= parseInt(this.productsPerPage);
                this.showTo -= parseInt(this.productsPerPage);
            }
        },
        sortBy(category) {
            if (this.category === category) {
                this.sort.sortFromLeast = !this.sort.sortFromLeast;
                this.products.sort((a, b) => {
                    if (this.sort.sortFromLeast) {
                        return a[category] - b[category];
                    } else {
                        return b[category] - a[category];
                    }
                });
                this.sort.category = this.category;
            }
            return;
        },
        selectAll(e) {
            if (e.target.checked) {
                this.visibleColumns = [
                    "products",
                    "calories",
                    "fat",
                    "carbs",
                    "protein",
                    "iron",
                ];
            }
        },
        removeProduct(product) {
            if (!this.productsToDelete.includes(product)) {
                this.productsToDelete.push(product);
            }
        },
        removeFromDeleteArray(product) {
            const index = this.productsToDelete.findIndex(
                (item) => item === product
            );
            this.productsToDelete.splice(index, 1);
        },
        async deleteProducts() {
            try {
                await this.fetchDelete(this.productsToDelete);
                this.productsToDelete = [];
            } catch (e) {
                this.deleteProductsError = true;
                console.error(e.error);
            }
        },
        ...mapActions(["fetchProducts", "fetchDelete"]),
    },
};
</script>

<style lang="scss">
.table {
    padding: 20px 50px;

    &__header {
        margin-bottom: 10px;
    }

    &__sort-wrapper {
        padding: 10px 0;
        display: flex;
    }

    &__sortby {
        &-wrapper {
            display: flex;
            margin-right: 15px;
            font-size: 0.9rem;

            & span {
                margin-right: 10px;
            }
        }

        &-btn {
            padding: 7px 5px;
            cursor: pointer;
            border-radius: 3px;

            &--active {
                background-color: #00a11e;
                color: #fff;
            }
        }
    }

    &__products {
        width: 100%;
    }

    &__delete {
        position: relative;

        &-btn {
            margin-right: 10px;
            height: 100%;
        }

        &-modal {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }
    }
}

.pagination {
    margin: 0 10px;

    &-btn {
        height: 100%;
        background-color: #fff;
        border: 1px solid grey;
        border-radius: 3px;
        margin: 0 5px;
    }
}

.dropdown {
    position: relative;
    font-size: 14px;
    margin-top: 5px;

    &__btn {
        padding: 10px;
        padding-right: 30px;
        border: 1px solid black;
        border-radius: 3px;
        position: relative;
        cursor: pointer;

        &::before {
            content: "";
            position: absolute;
            background: url(~@/assets/2.svg);
            width: 8px;
            height: 5px;
            right: calc(0% + 15px);
            top: calc(50% - 2px);
        }
    }

    &__menu {
        position: absolute;
        top: 35px;
        padding: 10px;
        display: flex;
        flex-flow: column nowrap;
        background-color: #fff;
        border: 1px solid black;
        border-radius: 3px;
        box-shadow: 0 0 3px black;

        & label {
            margin: 5px;
        }
    }
}

#checkbox-toggle {
    display: none;
}
</style>