<template>
    <span>行：<span class="row-no">{{ value }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../config/eventBus';

    export default {
        name: 'RowNo',
        inject: [ 'editorInstance' ],
        data() {
            return {
                value: 0
            };
        },
        created() {
            eventBus.$on(EVENTS.RANGE_STYLE_CHANGE, this.updateRowNo);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.RANGE_STYLE_CHANGE, this.updateRowNo);
        },
        methods: {
            updateRowNo() {
                const instance = this.editorInstance();
                const rangeContext = instance.command.getRangeContext();
                rangeContext && (this.value = rangeContext.startRowNo + 1)
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
