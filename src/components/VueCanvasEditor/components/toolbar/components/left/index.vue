<template>
    <div class="menu-item__left" :title="`左对齐(${isApple() ? '⌘' : 'Ctrl'}+L)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Left',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.LEFT);
            },
            updateActiveStatus(payload) {
                const dom = this.$el;
                dom.classList.add('active');
                if (payload.rowFlex && payload.rowFlex !== 'left') {
                    dom.classList.remove('active');
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
