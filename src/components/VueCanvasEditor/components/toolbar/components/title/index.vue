<template>
    <div class="menu-item__size">
        <span class="select" title="字体" @click.stop="clickHandler">小四</span>
        <div ref="options" class="options" @click.stop="switchFontSizeHandler">
            <ul>
                <li data-size="56">初号</li>
                <li data-size="48">小初</li>
                <li data-size="34">一号</li>
                <li data-size="32">小一</li>
                <li data-size="29">二号</li>
                <li data-size="24">小二</li>
                <li data-size="21">三号</li>
                <li data-size="20">小三</li>
                <li data-size="18">四号</li>
                <li data-size="16">小四</li>
                <li data-size="14">五号</li>
                <li data-size="12">小五</li>
                <li data-size="10">六号</li>
                <li data-size="8">小六</li>
                <li data-size="7">七号</li>
                <li data-size="6">八号</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Size',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            switchFontSizeHandler(e) {
                const fontSize = e.target.dataset.size;
                if (fontSize) {
                    const instance = this.editorInstance();
                    instance.command.executeSize(parseInt(fontSize, 10));
                    this.clickHandler();
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
