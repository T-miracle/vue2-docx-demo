<template>
    <div class="menu-item__color" title="字体颜色" @click="clickHandler">
        <i></i>
        <span ref="span"></span>
        <input ref="color" type="color" id="color" @input="setColorHandler"/>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Superscript',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.color.click();
            },
            setColorHandler(e) {
                const instance = this.editorInstance();
                instance.command.executeColor(e.target.value);
            },
            updateActiveStatus(payload) {
                const colorDom = this.$el;
                const colorControlDom = this.$refs.color;
                const colorSpanDom = this.$refs.span;

                if (payload.color) {
                    colorDom.classList.add('active')
                    colorControlDom.value = payload.color
                    colorSpanDom.style.backgroundColor = payload.color
                } else {
                    colorDom.classList.remove('active')
                    colorControlDom.value = '#000000'
                    colorSpanDom.style.backgroundColor = '#000000'
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
