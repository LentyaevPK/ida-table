<template>
    <div class="table-row table-row--bold table-header">
        <input type="checkbox" v-if="visibleColumns.length" />
        <div
            v-if="visibleColumns.includes('products')"
            class="table-row__product"
            :class="[{'table-row--active-up': sort.category === 'product' && sort.sortFromLeast,
                    'table-row--active-down': sort.category === 'product' && !sort.sortFromLeast,
                    'table-row--first': category === 'products'}]"
            @click="sortBy('product')"
        >Product (100g serving)</div>
        <div
            v-if="visibleColumns.includes('calories')"
            class="table-row__calories"
            :class="[{'table-row--active-up': sort.category === 'calories' && sort.sortFromLeast,
                    'table-row--active-down': sort.category === 'calories' && !sort.sortFromLeast,
                    'table-row--first': category === 'calories'}]"
            @click="sortBy('calories')"
        >Calories</div>
        <div
            v-if="visibleColumns.includes('fat')"
            class="table-row__fat"
            :class="[{'table-row--active-up': sort.category === 'fat' && sort.sortFromLeast,
                    'table-row--active-down': sort.category === 'fat' && !sort.sortFromLeast,
                    'table-row--first': category === 'fat'}]"
            @click="sortBy('fat')"
        >Fat (g)</div>
        <div
            v-if="visibleColumns.includes('carbs')"
            class="table-row__carbs"
            :class="[{'table-row--active-up': sort.category === 'carbs' && sort.sortFromLeast,
                    'table-row--active-down': sort.category === 'carbs' && !sort.sortFromLeast,
                    'table-row--first': category === 'carbs'}]"
            @click="sortBy('carbs')"
        >Carbs (g)</div>
        <div
            v-if="visibleColumns.includes('protein')"
            class="table-row__protein"
            :class="[{'table-row--active-up': sort.category === 'protein' && sort.sortFromLeast,
                    'table-row--active-down': sort.category === 'protein' && !sort.sortFromLeast,
                    'table-row--first': category === 'protein'}]"
            @click="sortBy('protein')"
        >Protein (g)</div>
        <div
            v-if="visibleColumns.includes('iron')"
            class="table-row__iron"
            :class="[{'th--active-up': sort.category === 'iron' && sort.sortFromLeast,
                    'th--active-down': sort.category === 'iron' && !sort.sortFromLeast,
                    'table-row--first': category === 'iron'}]"
            @click="sortBy('iron')"
        >Iron (%)</div>
    </div>
</template>

<script>
export default {
    name: "TableHeader",
    props: {
        visibleColumns: {
            type: Array,
            required: true,
        },
        sort: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    methods: {
        sortBy(category) {
            this.$emit("sortBy", category);
        },
    },
};
</script>

<style lang="scss">
.table-header {
    &:hover {
        background-color: #fff;
    }
}
</style>