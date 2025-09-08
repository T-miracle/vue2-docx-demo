<template>
    <span>字数：<span class="word-count">{{ value }}</span></span>
</template>

<script>
    import { eventBus, EVENTS } from '../../../../eventBus';

    export default {
        name: 'WordCount',
        inject: ['editorInstance'],
        data() {
            return {
                value: 0
            };
        },
        created() {
            eventBus.$on(EVENTS.UPDATE_WORD_COUNT, this.updateWordCount);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.UPDATE_WORD_COUNT, this.updateWordCount);
        },
        methods: {
            async updateWordCount() {
                this.value = await this.editorInstance().command.getWordCount() ?? 0;
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
