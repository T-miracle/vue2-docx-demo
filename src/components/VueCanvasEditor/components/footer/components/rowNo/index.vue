<template>
    <span>行：<span class="row-no">{{ value }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../eventBus';

    export default {
        name: 'RowNo',
        data() {
            return {
                value: 0
            }
        },
        created() {
            eventBus.$on(EVENTS.UPDATE_ROW_NO, val => this.value = val);
        }
    };
</script>

<style scoped lang="scss">

</style>
