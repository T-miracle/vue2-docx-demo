<template>
    <div
        class="menu-item__superscript"
        :title="`上标(${isApple() ? '⌘' : 'Ctrl'}+Shift+,)`"
        @click.stop="clickHandler"
    >
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Superscript',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeSuperscript();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
