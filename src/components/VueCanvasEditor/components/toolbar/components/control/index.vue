<template>
    <div class="menu-item__page-break" title="分页符" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'PageBreak',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.editorInstance().command.executePageBreak()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
