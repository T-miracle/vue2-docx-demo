<template>
    <div class="menu-item__undo" :title="title" @click.stop="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Undo',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `撤销(${ this.isApple() ? '⌘' : 'Ctrl' }+Z)`;
            }
        },
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeUndo()
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
