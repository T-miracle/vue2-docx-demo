<template>
    <div class="menu-item__redo" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: "Redo",
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `重做(${ this.isApple() ? '⌘' : 'Ctrl' }+Y)`;
            }
        },
        methods: {
            clickHandler() {
                const editor = this.editorInstance();
                if (editor) {
                    editor.command.executeRedo()
                }
            },
            updateActiveStatus(payload) {
                const redoDom = this.$el;

                payload.redo
                    ? redoDom.classList.remove('no-allow')
                    : redoDom.classList.add('no-allow')
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
