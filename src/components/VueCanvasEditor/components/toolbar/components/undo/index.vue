<template>
    <div class="menu-item__undo" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Undo',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `撤销(${ this.isApple() ? '⌘' : 'Ctrl' }+Z)`;
            }
        },
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeUndo()
                }
            },
            updateActiveStatus(payload) {
                const undoDom = this.$el;

                payload.undo
                    ? undoDom.classList.remove('no-allow')
                    : undoDom.classList.add('no-allow')
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
