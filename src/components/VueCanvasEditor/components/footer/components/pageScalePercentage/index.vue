<template>
    <span class="page-scale-percentage" title="显示比例(点击可复原Ctrl+0)" @click="clickHandler">{{ value }}%</span>
</template>

<script>
    import { eventBus, EVENTS } from '@/components/VueCanvasEditor/eventBus';

    export default {
        name: "PageScalePercentage",
        inject: [ 'editorInstance' ],
        data() {
            return {
                value: 100
            };
        },
        created() {
            eventBus.$on(EVENTS.PAGE_SCALE_CHANGE, this.changePercentage)
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.PAGE_SCALE_CHANGE, this.changePercentage)
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();

                instance.command.executePageScaleRecovery();
            },
            changePercentage(payload) {
                this.value = Math.floor(payload * 10 * 10)
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
