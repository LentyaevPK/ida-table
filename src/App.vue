<template>
    <div id="app">
        <Table />
    </div>
</template>

<script>
import Table from "./components/Table";

export default {
    name: "App",
    components: {
        Table
    }
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", "Ubuntu", Arial, Helvetica, sans-serif;
}
</style>
