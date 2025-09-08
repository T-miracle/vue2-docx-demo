<template>
    <div class="menu-item__strikeout" title="删除线(Ctrl+Shift+X)" @click.stop="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: "Strikeout",
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeStrikeout()
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
