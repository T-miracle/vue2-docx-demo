<template>
    <div class="page-scale-add" title="放大(Ctrl+=)" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: "PageScaleAdd",
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();

                instance.command.executePageScaleAdd();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
