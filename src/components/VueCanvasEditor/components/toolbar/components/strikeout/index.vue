<template>
    <div class="menu-item__strikeout" title="删除线(Ctrl+Shift+X)" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Strikeout',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.editorInstance()?.command.executeStrikeout();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
