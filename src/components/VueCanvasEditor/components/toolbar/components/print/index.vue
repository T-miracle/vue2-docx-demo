<template>
    <div class="menu-item__print" data-menu="print" :title="`打印(${isApple() ? '⌘' : 'Ctrl'}+P)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    export default {
        name: 'Print',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executePrint()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
