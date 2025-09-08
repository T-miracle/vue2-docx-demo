<template>
    <div class="paper-size" @click="clickHandler">
        <i title="纸张类型"></i>
        <div ref="options" class="options" @click="optionsClickHandler">
            <ul>
                <li data-paper-size="794*1123" class="active">A4</li>
                <li data-paper-size="1593*2251">A2</li>
                <li data-paper-size="1125*1593">A3</li>
                <li data-paper-size="565*796">A5</li>
                <li data-paper-size="412*488">5号信封</li>
                <li data-paper-size="450*866">6号信封</li>
                <li data-paper-size="609*862">7号信封</li>
                <li data-paper-size="862*1221">9号信封</li>
                <li data-paper-size="813*1266">法律用纸</li>
                <li data-paper-size="813*1054">信纸</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PagerSize',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible');
            },
            optionsClickHandler(evt) {
                const instance = this.editorInstance();

                const li = evt.target;
                const paperType = li.dataset.paperSize;
                const [ width, height ] = paperType.split('*').map(Number);
                instance.command.executePaperSize(width, height);
                // 纸张状态回显
                this.$refs.options.querySelectorAll('li')
                    .forEach(child => child.classList.remove('active'));
                li.classList.add('active');
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
