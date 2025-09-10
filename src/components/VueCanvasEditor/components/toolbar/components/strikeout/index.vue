<template>
    <div class="menu-item__strikeout" title="删除线(Ctrl+Shift+X)" @click="clickHandler">
        <i></i>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Strikeout',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.editorInstance().command.executeStrikeout();
            },
            updateActiveStatus(payload) {
                const strikeoutDom = this.$el;
                payload.strikeout
                    ? strikeoutDom.classList.add('active')
                    : strikeoutDom.classList.remove('active');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
