<template>
    <div class="page-mode" @click="clickHandler">
        <i title="页面模式(分页、连页)"></i>
        <div ref="options" class="options" @click="optionClickHandler">
            <ul>
                <li data-page-mode="paging" :class="{active: mode === 'paging'}">分页</li>
                <li data-page-mode="continuity" :class="{active: mode === 'continuity'}">连页</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../config/eventBus';

    export default {
        name: 'PageMode',
        inject: ['editorInstance'],
        data() {
            return {
                mode: 'paging'
            };
        },
        created() {
            eventBus.$on(EVENTS.PAGE_MODE_CHANGE, this.pageModeChangeHandler);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.PAGE_MODE_CHANGE, this.pageModeChangeHandler);
        },
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            optionClickHandler(evt) {
                const li = evt.target
                this.editorInstance().command.executePageMode(li.dataset.pageMode)
            },
            pageModeChangeHandler(mode) {
                this.mode = mode;
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
