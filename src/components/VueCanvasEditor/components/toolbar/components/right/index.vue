<template>
    <div class="menu-item__right" :title="`右对齐(${isApple() ? '⌘' : 'Ctrl'}+R)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';

    export default {
        name: 'Right',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.RIGHT);
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
