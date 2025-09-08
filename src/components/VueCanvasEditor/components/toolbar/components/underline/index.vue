<template>
    <div class="menu-item__italic" :title="title" @click.stop="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Italic',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `斜体(${ this.isApple() ? '⌘' : 'Ctrl' }+I)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeItalic();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
