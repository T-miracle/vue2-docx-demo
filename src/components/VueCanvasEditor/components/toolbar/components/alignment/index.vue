<template>
    <div class="menu-item__alignment" :title="`两端对齐(${isApple() ? '⌘' : 'Ctrl'}+J)`" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import { RowFlex } from '@hufe921/canvas-editor';
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Alignment',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                editor.command.executeRowFlex(RowFlex.ALIGNMENT);
            },
            updateActiveStatus(payload) {
                const dom = this.$el;
                if (payload.rowFlex && payload.rowFlex === 'alignment') {
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
