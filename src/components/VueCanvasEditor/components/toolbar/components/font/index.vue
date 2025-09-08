<template>
    <div class="menu-item__font" @click="clickHandler">
        <span class="select" :title="title">微软雅黑</span>
        <div ref="options" class="options" @click="switchFontFamilyHandler">
            <ul>
                <li data-family="Microsoft YaHei" style="font-family:'Microsoft YaHei';">微软雅黑</li>
                <li data-family="华文宋体" style="font-family:'华文宋体';">华文宋体</li>
                <li data-family="华文黑体" style="font-family:'华文黑体';">华文黑体</li>
                <li data-family="华文仿宋" style="font-family:'华文仿宋';">华文仿宋</li>
                <li data-family="华文楷体" style="font-family:'华文楷体';">华文楷体</li>
                <li data-family="华文琥珀" style="font-family:'华文琥珀';">华文琥珀</li>
                <li data-family="华文楷体" style="font-family:'华文楷体';">华文楷体</li>
                <li data-family="华文隶书" style="font-family:'华文隶书';">华文隶书</li>
                <li data-family="华文新魏" style="font-family:'华文新魏';">华文新魏</li>
                <li data-family="华文行楷" style="font-family:'华文行楷';">华文行楷</li>
                <li data-family="华文中宋" style="font-family:'华文中宋';">华文中宋</li>
                <li data-family="华文彩云" style="font-family:'华文彩云';">华文彩云</li>
                <li data-family="Arial" style="font-family:'Arial';">Arial</li>
                <li data-family="Segoe UI" style="font-family:'Segoe UI';">Segoe UI</li>
                <li data-family="Ink Free" style="font-family:'Ink Free';">Ink Free</li>
                <li data-family="Fantasy" style="font-family:'Fantasy';">Fantasy</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Font',
        inject: [ 'editorInstance', 'isApple' ],
        computed: {
            title() {
                return `字体`;
            }
        },
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible')
            },
            switchFontFamilyHandler(e) {
                const fontFamily = e.target.dataset.family;
                console.log(fontFamily);
                if (fontFamily) {
                    const instance = this.editorInstance();
                    instance.command.executeFont(e.target.dataset.family);
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
