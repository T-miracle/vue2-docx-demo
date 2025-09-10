<template>
    <div class="menu-item__justify" :title="`分散对齐(${isApple() ? '⌘' : 'Ctrl'}+Shift+J)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Justify',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.JUSTIFY);
            },
            updateActiveStatus(payload) {
                const dom = this.$el;
                if (payload.rowFlex && payload.rowFlex === 'justify') {
                    dom.classList.add('active');
                } else {
                    dom.classList.remove('active');
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
