<template>
    <div class="menu-item__highlight" title="高亮" @click="clickHandler">
        <i></i>
        <span ref="span"></span>
        <input ref="color" type="color" id="highlight" @input="setColorHandler">
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Highlight',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.color.click();
            },
            setColorHandler(e) {
                const instance = this.editorInstance();
                instance.command.executeHighlight(e.target.value);
            },
            updateActiveStatus(payload) {
                const highlightDom = this.$el;
                const highlightControlDom = this.$refs.color;
                const highlightSpanDom = this.$refs.span;

                if (payload.highlight) {
                    highlightDom.classList.add('active')
                    highlightControlDom.value = payload.highlight
                    highlightSpanDom.style.backgroundColor = payload.highlight
                } else {
                    highlightDom.classList.remove('active')
                    highlightControlDom.value = '#ffff00'
                    highlightSpanDom.style.backgroundColor = '#ffff00'
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
