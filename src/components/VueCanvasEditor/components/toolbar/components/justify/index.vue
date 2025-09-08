<template>
    <div class="menu-item__alignment" :title="`两端对齐(${isApple() ? '⌘' : 'Ctrl'}+J)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';

    export default {
        name: 'Alignment',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.ALIGNMENT);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
