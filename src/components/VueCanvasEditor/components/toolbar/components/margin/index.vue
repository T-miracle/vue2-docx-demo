<template>
    <div class="menu-item__row-margin" @click="clickHandler">
        <i title="行间距"></i>
        <div ref="options" class="options" @click="changeRowMarginHandler">
            <ul>
                <li data-rowmargin='1'>1</li>
                <li data-rowmargin="1.25">1.25</li>
                <li data-rowmargin="1.5">1.5</li>
                <li data-rowmargin="1.75">1.75</li>
                <li data-rowmargin="2">2</li>
                <li data-rowmargin="2.5">2.5</li>
                <li data-rowmargin="3">3</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ActiveMixins from '@/components/VueCanvasEditor/components/toolbar/mixins/activeMixins';

    export default {
        name: 'Margin',
        mixins: [ ActiveMixins ],
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            changeRowMarginHandler(evt) {
                this.editorInstance().command.executeRowMargin(Number(evt.target.dataset.rowmargin));
            },
            updateActiveStatus(payload) {
                const rowOptionDom = this.$refs.options;

                rowOptionDom
                    .querySelectorAll('li')
                    .forEach(li => li.classList.remove('active'));
                const curRowMarginDom = rowOptionDom.querySelector(
                    `[data-rowmargin='${ payload.rowMargin }']`
                );
                curRowMarginDom.classList.add('active');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>