<template>
    <div class="menu-item__size-minus" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'SizeMinus',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `缩小字号(${ this.isApple() ? '⌘' : 'Ctrl' }+])`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeSizeMinus()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
