<template>
    <div class="page-scale-minus" title="缩小(Ctrl+-)" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'PageScaleMinus',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();

                instance.command.executePageScaleMinus();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
