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
    export default {
        name: 'Margin',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            changeRowMarginHandler(evt) {
                this.editorInstance().command.executeRowMargin(Number(evt.target.dataset.rowmargin))
            }
        }
    };
</script>

<style scoped lang="scss">

</style>