<template>
    <span>列：<span class="col-no">{{ value }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../eventBus';

    export default {
        name: 'ColNo',
        data() {
            return {
                value: 0
            }
        },
        created() {
            eventBus.$on(EVENTS.UPDATE_COL_NO, val => this.value = val);
        }
    };
</script>

<style scoped lang="scss">

</style>
