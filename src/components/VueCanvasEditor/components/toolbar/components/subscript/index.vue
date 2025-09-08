<template>
    <div
        class="menu-item__superscript"
        :title="`下标(${isApple() ? '⌘' : 'Ctrl'}+Shift+.)`"
        @click="clickHandler"
    >
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Subscript',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeSubscript();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
