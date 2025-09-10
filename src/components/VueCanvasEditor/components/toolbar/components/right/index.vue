<template>
    <div class="menu-item__right" :title="`右对齐(${isApple() ? '⌘' : 'Ctrl'}+R)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Right',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.RIGHT);
            },
            updateActiveStatus(payload) {
                const dom = this.$el;
                if (payload.rowFlex && payload.rowFlex === 'right') {
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
