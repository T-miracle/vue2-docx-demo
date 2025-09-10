<template>
    <div class="menu-item__bold" :title="title" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Bold',
        inject: [ 'editorInstance', 'isApple' ],
        mixins: [ ActiveMixins ],
        computed: {
            title() {
                return `加粗(${ this.isApple() ? '⌘' : 'Ctrl' }+B)`;
            }
        },
        methods: {
            clickHandler() {
                const instance = this.editorInstance();
                instance.command.executeBold();
            },
            updateActiveStatus(payload) {
                const boldDom = this.$el;
                payload.bold ? boldDom.classList.add('active') : boldDom.classList.remove('active')
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
