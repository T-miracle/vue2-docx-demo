<template>
    <div class="menu-item__bold" :title="title" @click.stop="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Bold',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `加粗(${ this.isApple() ? '⌘' : 'Ctrl' }+B)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeBold();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
