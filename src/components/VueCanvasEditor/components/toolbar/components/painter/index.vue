<template>
    <div class="menu-item__redo" :title="title" @click.stop="redo">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: "Redo",
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `重做(${ this.isApple() ? '⌘' : 'Ctrl' }+Y)`;
            }
        },
        methods: {
            redo() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeRedo()
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
