<template>
    <div class="menu-item__center" :title="`右对齐(${isApple() ? '⌘' : 'Ctrl'}+E)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';

    export default {
        name: 'Center',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.CENTER);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
