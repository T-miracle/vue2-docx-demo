<template>
    <span class="page-scale-percentage" title="显示比例(点击可复原Ctrl+0)" @click="clickHandler">100%</span>
</template>

<script>
    export default {
        name: "PageScalePercentage",
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();

                instance.command.executePageScaleRecovery();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
