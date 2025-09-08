<template>
    <div class="menu-item__size-add" :title="title" @click.stop="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'SizeAdd',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `增大字号(${ this.isApple() ? '⌘' : 'Ctrl' }+[)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeSizeAdd()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
