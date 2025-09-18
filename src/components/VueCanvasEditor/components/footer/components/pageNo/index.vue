<template>
    <span>页面：<span class="page-no">{{ no }}</span>/<span class="page-size">{{ size }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../config/eventBus';

    export default {
        name: 'PageNo',
        data() {
            return {
                no: 1,
                size: 1
            }
        },
        created() {
            eventBus.$on(EVENTS.PAGE_NO_CHANGE, this.pageNoChangeHandler)
            eventBus.$on(EVENTS.PAGE_SIZE_CHANGE, this.pageSizeChangeHandler)
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.PAGE_NO_CHANGE, this.pageNoChangeHandler)
            eventBus.$off(EVENTS.PAGE_SIZE_CHANGE, this.pageSizeChangeHandler)
        },
        methods: {
            pageNoChangeHandler(payload) {
                this.no = payload + 1;
            },
            pageSizeChangeHandler(payload) {
                this.size = payload;
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
