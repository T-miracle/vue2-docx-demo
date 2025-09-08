<template>
    <span>可见页码：<span class="page-no-list">{{ value }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../eventBus';

    export default {
        name: 'PageNoList',
        data() {
            return {
                value: 1
            }
        },
        created() {
            eventBus.$on(EVENTS.VISIBLE_PAGE_NO_LIST_CHANGE, this.pageNoListChangeHandler);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.VISIBLE_PAGE_NO_LIST_CHANGE, this.pageNoListChangeHandler);
        },
        methods: {
            pageNoListChangeHandler(payload) {
                const text = payload.map(i => i + 1).join('、')
                this.value = text ?? '1';
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
