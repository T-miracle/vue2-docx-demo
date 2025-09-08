<template>
    <div class="menu-item__left" :title="`左对齐(${isApple() ? '⌘' : 'Ctrl'}+L)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';

    export default {
        name: 'Left',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.LEFT);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
