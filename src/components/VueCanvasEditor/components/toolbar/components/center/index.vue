<template>
    <div class="menu-item__center" :title="`居中对齐(${isApple() ? '⌘' : 'Ctrl'}+E)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Center',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.CENTER);
            },
            updateActiveStatus(payload) {
                const dom = this.$el;
                if (payload.rowFlex && payload.rowFlex === 'center') {
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
