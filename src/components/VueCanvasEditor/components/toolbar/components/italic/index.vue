<template>
    <div class="menu-item__italic" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Italic',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `斜体(${ this.isApple() ? '⌘' : 'Ctrl' }+I)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeItalic();
            },
            updateActiveStatus(payload) {
                const italicDom = this.$el;
                payload.italic ? italicDom.classList.add('active') : italicDom.classList.remove('active');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>