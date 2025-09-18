<template>
    <div class="catalog-mode" title="目录" @click="toggleCatalog">
        <i></i>
    </div>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../config/eventBus';

    export default {
        name: 'CatalogMode',
        methods: {
            toggleCatalog() {
                eventBus.$emit(EVENTS.TOGGLE_CATALOG);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
