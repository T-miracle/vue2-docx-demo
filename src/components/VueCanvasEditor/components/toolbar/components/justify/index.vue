<template>
    <div class="menu-item__justify" :title="`分散对齐(${isApple() ? '⌘' : 'Ctrl'}+Shift+J)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';

    export default {
        name: 'Justify',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.JUSTIFY);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
