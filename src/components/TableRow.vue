<template>
    <div class="table-row" @mouseover="showDeleteBtn = true" @mouseout="showDeleteBtn = false">
        <input
            type="checkbox"
            v-if="visibleColumns.length"
            :checked="productsToDelete.includes(product)"
            @change="checkProduct($event, product)"
        />
        <div
            v-if="visibleColumns.includes('products')"
            class="table-row__product"
            :class="{'table-row--first': category === 'products'}"
        >{{product.product}}</div>
        <div
            v-if="visibleColumns.includes('calories')"
            class="table-row__calories"
            :class="{'table-row--first': category === 'calories'}"
        >{{product.calories}}</div>
        <div
            v-if="visibleColumns.includes('fat')"
            class="table-row__fat"
            :class="{'table-row--first': category === 'fat'}"
        >{{product.fat}}</div>
        <div
            v-if="visibleColumns.includes('carbs')"
            class="table-row__carbs"
            :class="{'table-row--first': category === 'carbs'}"
        >{{product.carbs}}</div>
        <div
            v-if="visibleColumns.includes('protein')"
            class="table-row__protein"
            :class="{'table-row--first': category === 'protein'}"
        >{{product.protein}}</div>
        <div
            v-if="visibleColumns.includes('iron')"
            class="table-row__iron"
            :class="{'table-row--first': category === 'iron'}"
        >{{product.iron}}</div>
        <div v-show="showDeleteBtn" class="table-row__delete">
            <span class="table-row__delete-btn" @click="showModal = !showModal">delete</span>
            <div v-if="showModal" class="table-row__modal">
                <p style="text-align: center">
                    Are you sure you want to
                    <strong>delete item?</strong>
                </p>
                <div style="display: flex; justify-content: center">
                    <button
                        class="table-row__btn"
                        @click="showModal = false, showDeleteBtn = false"
                    >Cancel</button>
                    <button
                        class="table-row__btn table-row__btn--green"
                        @click="removeProduct(product)"
                    >Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableRow",
    props: {
        product: {
            type: Object,
            required: true,
        },
        visibleColumns: {
            type: Array,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        productsToDelete: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showDeleteBtn: false,
            showModal: false,
        };
    },
    methods: {
        removeProduct(product) {
            this.$emit("removeProduct", product);
            this.showModal = false;
            this.showDeleteBtn = false;
        },
        checkProduct(e, product) {
            if (e.target.checked) {
                this.$emit("removeProduct", product);
            } else {
                this.$emit("removeFromDeleteArray", product);
            }
        },
    },
};
</script>

<style lang="scss">
.table-row {
    display: flex;
    flex-flow: row nowrap;
    padding: 20px 30px;

    &:nth-child(2n) {
        background-color: #f8f9fa;
    }

    &__product {
        width: 25%;
        padding-left: 10px;
    }

    &__calories {
        width: 10%;
        padding-left: 10px;
    }

    &__fat {
        width: 10%;
        padding-left: 10px;
    }

    &__carbs {
        width: 10%;
        padding-left: 10px;
    }

    &__protein {
        width: 10%;
        padding-left: 10px;
    }

    &__iron {
        width: 10%;
        padding-left: 10px;
    }

    &--bold {
        font-weight: 800;
        cursor: pointer;
    }

    &--first {
        order: -1;
    }

    & input {
        order: -2;
    }

    &--active {
        &-up {
            color: #00a11e;
            &::after {
                content: "↑";
                margin-left: 5px;
            }
        }

        &-down {
            color: #00a11e;
            &::after {
                content: "↓";
                margin-left: 5px;
            }
        }
    }

    &:hover {
        background-color: rgba(0, 161, 30, 0.07);
    }

    &__delete {
        position: relative;

        &-btn {
            color: #5b5e77;
            cursor: pointer;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                width: 13px;
                height: 16px;
                background: url(~@/assets/1.svg);
                left: calc(0% - 18px);
            }
        }
    }

    &__modal {
        position: absolute;
        width: 300px;
        height: 100px;
        top: calc(100% + 15px);
        left: calc(0% - 100px);
        background-color: #fff;
        box-shadow: 0 1px 4px grey;
        border-radius: 3px;
    }

    &__btn {
        background-color: #fff;
        padding: 7px;
        border: 1px solid grey;
        border-radius: 3px;
        margin: 0 5px;
        cursor: pointer;

        &--green {
            background-color: #00a11e;
            color: #fff;
            border: 1px solid grey;
            border-radius: 3px;
        }
    }
}
</style>