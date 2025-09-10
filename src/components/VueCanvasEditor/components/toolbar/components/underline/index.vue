<template>
    <div class="menu-item__underline" @click="clickHandler">
        <i></i>
        <span class="select" :title="title"></span>
        <div ref="options" class="options" @click="switchDecorationStyleHandler">
            <ul>
                <li data-decoration-style='solid'>
                    <i></i>
                </li>
                <li data-decoration-style='double'>
                    <i></i>
                </li>
                <li data-decoration-style='dashed'>
                    <i></i>
                </li>
                <li data-decoration-style='dotted'>
                    <i></i>
                </li>
                <li data-decoration-style='wavy'>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Underline',
        inject: [ 'editorInstance', 'isApple' ],
        mixins: [ ActiveMixins ],
        computed: {
            title() {
                return `下划线(${ this.isApple() ? '⌘' : 'Ctrl' }+U)`;
            }
        },
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            switchDecorationStyleHandler(e) {
                const decorationStyle = e.target.dataset.decorationStyle;
                console.log(decorationStyle);
                if (decorationStyle) {
                    const instance = this.editorInstance();
                    instance.command.executeUnderline({
                        style: decorationStyle
                    });
                    this.clickHandler();
                }
            },
            updateActiveStatus(payload) {
                const underlineDom = this.$el;

                payload.underline
                    ? underlineDom.classList.add('active')
                    : underlineDom.classList.remove('active')
            },
        }
    };
</script>

<style scoped lang="scss">

</style>
